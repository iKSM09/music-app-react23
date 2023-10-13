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
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from ".";

export type SongDataType = {
  id: string;
  name: string;
  modified_name: string;
  genre: string;
  comment_count: number;
  like_count: number;
  url: string;
  uploader: string;
  uploader_id: string;
};

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
  if (data.url === "") return;

  const q = query(songsCollection, where("name", "==", data.name));
  const { size } = await getDocs(q);

  console.log({ size });

  if (size !== 0) return;

  return await addDoc(songsCollection, data);
};

// Update a document
export const updateSongDoc = async (
  docID: string,
  dataToBeUpdated: DocumentData
) => {
  const docRef = doc(db, path, docID);
  await updateDoc(docRef, {
    ...dataToBeUpdated,

    // server timestamp, tracks when the server receives the update.
    // timestamp: serverTimestamp(),

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

  if (!docSnap.exists()) {
    console.log("No such document!");
    return;
  }

  const song: DocumentData = { id: docSnap.id, ...docSnap.data() };

  return song;
};

// Get multiple Documents
export const getUserSongDocs = async (userID: string) => {
  if (userID) {
    const songs: DocumentData[] = [];

    const q = query(songsCollection, where("uploader_id", "==", userID));
    // const q1 = query(collection(db, "cities"),
    //  orderBy("name"),
    //  orderBy("state"),
    //  startAt("Springfield"));

    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      const song = { id: doc.id, ...doc.data() };
      songs.push(song);
    });

    return songs;
  }

  return undefined;
};

// Get all Documents
export const getAllSongDocs = async () => {
  const songs: DocumentData[] = [];

  const querySnap = await getDocs(songsCollection);
  querySnap.forEach((doc) => {
    const song = { id: doc.id, ...doc.data() };
    songs.push(song);
  });

  return songs;
};

// Comments
export const addCommentDoc = async (data: DocumentData) => {
  if (data.commentor_name === undefined || data.commentor_id === undefined)
    return;

  const commentsCollection = collection(db, "songs", data.sid, "comments");
  return await addDoc(commentsCollection, data);
};

export const getCommentsDocs = async (songId: string) => {
  const comments: DocumentData[] = [];
  const commentsCollection = collection(db, "songs", songId, "comments");

  const querySnap = await getDocs(commentsCollection);
  querySnap.forEach((doc) => {
    const comment = { id: doc.id, ...doc.data() };
    comments.push(comment);
  });

  return comments;
};

// Likes
export const getUserLikeDoc = async (songId: string, userId: string) => {
  const likesCollection = collection(db, "songs", songId, "likes");
  const docRef = doc(likesCollection, userId);

  const docSnap = await getDoc(docRef);

  return await docSnap.exists();

  // if (!docSnap.exists()) {
  //   console.log("No such document!");
  //   return;
  // }

  // const user: DocumentData = { uid: docSnap.id, ...docSnap.data() };
  // return user;
};

export const addLikeDoc = async (songId: string, user: DocumentData) => {
  if (!user.uid) return;

  const likesCollection = collection(db, "songs", songId, "likes");
  const docRef = doc(likesCollection, user.uid);
  return await setDoc(docRef, user);
};

export const deleteLikeDoc = async (songId: string, userId: string) => {
  const likesCollection = collection(db, "songs", songId, "likes");
  const docRef = doc(likesCollection, userId);
  return await deleteDoc(docRef);
};
