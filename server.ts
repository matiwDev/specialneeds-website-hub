import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
app.use(express.json());

const PORT = 3000;
const mockDbPath = path.join(process.cwd(), "mock_database.json");

// Core helper to access the custom file DB
function loadMockDb() {
  try {
    if (!fs.existsSync(mockDbPath)) {
      return { resources: [], userProfiles: {} };
    }
    const data = fs.readFileSync(mockDbPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to read mock DB:", err);
    return { resources: [], userProfiles: {} };
  }
}

function saveMockDb(db: any) {
  try {
    fs.writeFileSync(mockDbPath, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write mock DB:", err);
  }
}

// Extract authorization helper
function getRequestUserId(req: express.Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }
  return null;
}

// API ROUTE 1: Resource list (with secure fields stripped)
app.get("/api/resources", (req, res) => {
  const db_data = loadMockDb();
  const userId = getRequestUserId(req);

  // Fetch the user's profile to see if they've unlocked selective fields
  let unlockedIds: string[] = [];
  let userRole = "parent";
  
  if (userId) {
    const profile = db_data.userProfiles[userId];
    if (profile) {
      unlockedIds = profile.unlockedResourceIds || [];
      userRole = profile.role || "parent";
    }
  }

  // Always strip secure fields (mockSecureUrl, content) for items the user hasn't unlocked
  const resources = db_data.resources.map((res: any) => {
    const isUnlocked = res.price === 0 || unlockedIds.includes(res.id) || userRole === "admin";
    
    // We strictly follow the gated access model: do not send full path payloads unless matching unlocked scope
    const baseResource = {
      id: res.id,
      title: res.title,
      description: res.description,
      type: res.type,
      price: res.price,
      category: res.category,
      unlocked: isUnlocked
    };

    if (isUnlocked) {
      return {
        ...baseResource,
        mockSecureUrl: res.mockSecureUrl,
        content: res.content
      };
    }

    return baseResource;
  });

  res.json({ resources });
});

// API ROUTE 2: Fetch gated content with strict license control
app.get("/api/resources/:id/content", (req, res) => {
  const { id } = req.params;
  const userId = getRequestUserId(req);
  
  if (!userId) {
    return res.status(401).json({ error: "Access denied. Authentication code required." });
  }

  const db_data = loadMockDb();
  const resource = db_data.resources.find((r: any) => r.id === id);

  if (!resource) {
    return res.status(404).json({ error: "Resource item not found in catalogue." });
  }

  // Admin and free resources are automatically accessible
  if (resource.price === 0) {
    return res.json({
      id: resource.id,
      mockSecureUrl: resource.mockSecureUrl,
      content: resource.content
    });
  }

  const profile = db_data.userProfiles[userId];
  const unlockedIds = profile?.unlockedResourceIds || [];
  const isAdmin = profile?.role === "admin" || userId === "matiskp_admin"; // fallback check for local bootstrapped admin

  if (unlockedIds.includes(id) || isAdmin) {
    return res.json({
      id: resource.id,
      mockSecureUrl: resource.mockSecureUrl,
      content: resource.content
    });
  }

  res.status(403).json({
    error: "Resource is locked.",
    message: "Purchase or a valid subscription license is required to view this worksheet.",
    resourceId: id
  });
});

// API ROUTE 3: Retrieve or auto-initialize User Profile
app.get("/api/user-profile/:userId", (req, res) => {
  const { userId } = req.params;
  const db_data = loadMockDb();

  let profile = db_data.userProfiles[userId];
  
  // If user profile is not found in database, initialize a default safe profile to prevent crashes
  if (!profile) {
    const isDeveloperAdmin = userId === "matiskp_admin" || userId.includes("matiskp");
    profile = {
      userId,
      email: isDeveloperAdmin ? "matiskp@gmail.com" : `${userId}@simulated.com`,
      role: isDeveloperAdmin ? "admin" : "parent",
      unlockedResourceIds: []
    };
    db_data.userProfiles[userId] = profile;
    saveMockDb(db_data);
  }

  res.json(profile);
});

// API ROUTE 4: Update Profile
app.post("/api/user-profile", (req, res) => {
  const { userId, email, role, unlockedResourceIds } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: "userId parameter is required." });
  }

  const db_data = loadMockDb();
  
  // Enforce zero-trust checks: role can only be admin if authorized
  let finalRole = role || "parent";
  if (finalRole === "admin" && email !== "matiskp@gmail.com") {
    console.warn(`Attempted self-assigned admin role by ${email}. Denied.`);
    finalRole = "parent";
  }

  db_data.userProfiles[userId] = {
    userId,
    email: email || `${userId}@simulated.com`,
    role: finalRole,
    unlockedResourceIds: unlockedResourceIds || []
  };

  saveMockDb(db_data);
  res.json({ success: true, profile: db_data.userProfiles[userId] });
});

// API ROUTE 5: Simulates payments / and unlocks a resource
app.post("/api/unlock-resource", (req, res) => {
  const { userId, resourceId } = req.body;

  if (!userId || !resourceId) {
    return res.status(400).json({ error: "Missing userId or resourceId parameters." });
  }

  const db_data = loadMockDb();
  let profile = db_data.userProfiles[userId];

  // Auto create profile if it doesn't already exist
  if (!profile) {
    profile = {
      userId,
      email: `${userId}@simulated.com`,
      role: "parent",
      unlockedResourceIds: []
    };
  }

  // Add key if not already unlocked
  if (!profile.unlockedResourceIds.includes(resourceId)) {
    profile.unlockedResourceIds.push(resourceId);
  }

  db_data.userProfiles[userId] = profile;
  saveMockDb(db_data);

  res.json({ success: true, profile });
});

// Bootstrapping function for server and Vite middlewares
async function startServer() {
  // Vite integration middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA Fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Special Needs Server] Running and ready on http://0.0.0.0:${PORT}`);
  });
}

startServer();
