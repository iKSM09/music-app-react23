import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import type { User, NextOrObserver } from "firebase/auth";

import { auth } from ".";
import { createNewUserDoc } from "./db.user.firebase";

setPersistence(auth, browserLocalPersistence);

// Register
export const register = async (
  displayName: string,
  email: string,
  password: string
) => {
  if (!email || !password) return;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, { displayName });
  await createNewUserDoc(user);

  return user;
};

// Login
export const login = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);

export const loginWithPersistence = async (email: string, password: string) => {
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return login(email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(`${errorCode}: ${errorMessage}`);
    });
};

// Logout
export const logout = () => signOut(auth);

// Auth State Listener
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);
