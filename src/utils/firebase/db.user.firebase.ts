import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from ".";
import { User } from "firebase/auth";

// Get User Data
export const getUserData = async (user: User) => {
  const docRef = doc(db, "users", user.uid);
  const docSnapshot = await getDoc(docRef);
  return docSnapshot.data();
};

// Creating `New User` in Users Collection
export const createNewUserDoc = async (user: User) => {
  if (!user) return;

  const docRef = doc(db, "users", user.uid);
  const docSnapshot = await getDoc(docRef);

  // if user doc doesn't exist
  if (!docSnapshot.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();

    try {
      await setDoc(docRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      if (error instanceof Error)
        console.error(`error creating the user: ${error.message}`);
      console.error("unexpected error", error);
    }
  }
};
