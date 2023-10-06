import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJ4PF5WMNkVryFjyWQM6mqTdhGEahSGg0",
  authDomain: "media-zone-a4422.firebaseapp.com",
  projectId: "media-zone-a4422",
  storageBucket: "media-zone-a4422.appspot.com",
  appId: "1:1034428657583:web:ca57dea049ea4f87f5095a",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
