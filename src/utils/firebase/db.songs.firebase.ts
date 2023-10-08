import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from ".";

const path = "songs";
const songsCollection = collection(db, path);

// Set a Document - requires an ID
export const setSongDoc = async (docID: string, data: DocumentData) => {
  const docRef = doc(db, path, docID);

  // OR: Add a new document with a auto-generated id
  // const docRef = doc(songsCollection);

  // `setDoc()` requires an ID to create the document
  return await setDoc(docRef, data);
};

// Add a Document - no ID required
export const addSongDoc = async (data: DocumentData) => {
  return await addDoc(songsCollection, data);
};

// Update a document
export const updateSongDoc = async (dataID: string, dataToBeUpdated: any) => {
  const docRef = doc(db, path, dataID);
  await updateDoc(docRef, {
    ...dataToBeUpdated,

    // server timestamp, tracks when the server receives the update.
    timestamp: serverTimestamp(),

    // to update nested object
    // "obj.nestedObj": "value"

    // update elements in an array
    // array: arrayUnion("newValue"), // Atomically add a new value.
    // array: arrayRemove("newValue"), // // Atomically remove an existing value.

    // increment a numeric
    // number: increment(9) // Increment by 9
  });
};

// Delete a Document
export const deleteSongDoc = async (docID: string) => {
  const docRef = doc(db, path, docID);
  return await deleteDoc(docRef);
};

// Delete Document fields
export const deleteSongDocFields = async (docID: string) => {
  const docRef = doc(db, path, docID);
  await updateDoc(docRef, {
    fieldToBeDeleted: deleteField(),
  });
};

// Get a Document
export const getSongDoc = async (docID: string) => {
  const docRef = doc(db, path, docID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

  return docSnap;
};

// Get multiple Documents
export const getUserSongDocs = async (userID: string) => {
  const q = query(songsCollection, where("uid", "==", userID));
  // const q1 = query(collection(db, "cities"),
  //  orderBy("name"),
  //  orderBy("state"),
  //  startAt("Springfield"));

  const querySnap = await getDocs(q);
  querySnap.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(`${doc.id} => ${doc.data()}`);
  });
};

// Get all Documents
export const getAlSongDocs = async () => {
  const querySnap = await getDocs(songsCollection);
  querySnap.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(`${doc.id} => ${doc.data()}`);
  });
};
