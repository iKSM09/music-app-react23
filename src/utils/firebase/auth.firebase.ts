import {
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { firebaseApp } from ".";
import { createNewUserDoc } from "./db.firebase";

const auth = getAuth(firebaseApp);

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

// Logout
export const logout = () => signOut(auth);

// Auth State Listener
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);
