import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

let db: any = null;
let auth: any = null;
let isMockMode = true;

if (firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== "") {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    auth = getAuth(app);
    isMockMode = false;
    
    // Validate connection synchronously in background as per guidelines
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration: Client is offline.");
        }
      }
    };
    testConnection();
  } catch (err) {
    console.warn("Error bootstrapping official Firebase SDK. Engaging local sandbox:", err);
  }
} else {
  console.log("No custom Firebase API key detected. Engaging Special Needs Portal mock state.");
}

export { db, auth, isMockMode };
