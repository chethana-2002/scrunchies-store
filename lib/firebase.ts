import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyDhb5etI1IyUHLxklYtsPJqYdDTgctmTKE",
authDomain: "scrunchies-5ddac.firebaseapp.com",
projectId: "scrunchies-5ddac",
storageBucket: "scrunchies-5ddac.firebasestorage.app",
messagingSenderId: "765906865482",
appId: "1:765906865482:web:04e5dcc6aa0a876e87c5b3",
measurementId: "G-6W6PMGVLT5",
};

const app = !getApps().length
? initializeApp(firebaseConfig)
: getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
