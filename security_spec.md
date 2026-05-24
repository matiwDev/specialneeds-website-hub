# Security Specification: Special Needs Resource Portal

This document outlines the security invariants, threat modeling payloads, and rule verification rules for our Firestore database, following the standard Zero-Trust security guidelines.

## 1. Data Invariants

- **Read-Only Catalogue**: All educational resources under `resources/{resourceId}` are read-only for authenticated parents and educators. Writing, deleting, or editing is strictly reserved for Admin accounts.
- **Isolated User Profile**: User profiles stored under `userProfiles/{userId}` are strictly isolated. No user can read, create, modify, or delete another user's profile.
- **Role Lock**: The `role` property of `userProfiles/{userId}` is immutable after initialization and cannot be escalated to 'admin' by a normal parent/educator client.
- **Content Gating Integrity**: Full resource contents (secure links and worksheets) must never be fetched client-side. The database itself is stripped of secure payloads or the server manages the authorized delivery proxy.

---

## 2. The "Dirty Dozen" Threat Payloads (Test Attack Vectors)

1. **Self-Elevated Role Creation**: A malicious parent register a user profile requesting `role: "admin"`.
2. **Post-Registration Privilege Escalation**: A user updates their existing profile to modify `role` to `"admin"`.
3. **Cross-User Profile Hijacking**: User A makes a `getDoc` request to `/userProfiles/UserB` to view their private emails and unlocked resource lists.
4. **Catalogue Price Manipulation**: A guest or parent tries to update `/resources/res123` to set `price: 0`.
5. **Junk ID Resource Insertion**: A malicious agent attempts to call `setDoc` at `/resources/` using a massive 1MB string as the document ID to exhaust Firestore resources.
6. **Ghost Field Poisoning**: A client attempts to update their profile with a ghost field `isBetaTester: true` which doesn't exist in the JSON Schema definition.
7. **Bypassing Verification Status**: A user attempts to write profile data with `request.auth.token.email_verified == false`.
8. **Orphaned Unlock Hijacking**: A user tries to append a premium resource ID to their own `unlockedResourceIds` list directly using client-side SDK without paying.
9. **Catalogue Defacement / Deletion**: A user attempts to run `deleteDoc` on public resources under `/resources/res123`.
10. **Malicious Empty Profile creation**: Creating a user profile document that lacks required fields like `unlockedResourceIds` or `email` but has shadow fields.
11. **Client-Controlled List Scraper**: Attempting to query `/userProfiles` without any constraints to scan and collect all user emails.
12. **Double Timestamp Forgery**: Client attempts to submit creation of profile setting `createdAt` to a historical or future timestamp rather than `request.time`.

---

## 3. The Rules Audit and Fortress Safeguards

To prevent these, our security rules (`firestore.rules`) will implement:
- Standalone validation helpers `isValidUserProfile` and `isValidResource`.
- Mandatory Uid matching: `userId == request.auth.uid`.
- Strict Key checks using `.affectedKeys().hasOnly()` and complete key list matching.
- Default deny: `match /{document=**} { allow read, write: if false; }`
