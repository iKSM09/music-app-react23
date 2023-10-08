import {
  StorageError,
  UploadTaskSnapshot,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from ".";

const path = "songs";

// Create a Upload Task
export const createUploadTask = (file: File) => {
  const storageRef = ref(storage, `${path}/${file.name}`);
  return uploadBytesResumable(storageRef, file);
};

// Upload a file
export const uploadFile = async (file: File) => {
  const uploadTask = createUploadTask(file);

  try {
    const snapshot = await uploadTask;
    console.log(`Uploaded ${snapshot.totalBytes} bytes.`);

    // Let's get a download URL for the file.
    const downloadURL = getDownloadURLForFile(snapshot);
    console.log("File available at", downloadURL);
  } catch (err) {
    console.error("Upload failed", err);
  }
};

// Monitor uploads
export const monitorUploads = (file: File) => {
  const uploadTask = createUploadTask(file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      const downloadURL = getDownloadURLForFile(uploadTask.snapshot);
      console.log("File available at", downloadURL);
    }
  );
};

// Get a download URL
export const getDownloadURLForFile = async (snapshot: UploadTaskSnapshot) => {
  let downloadURL;

  try {
    downloadURL = await getDownloadURL(snapshot.ref);
  } catch (error) {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    if (error instanceof StorageError) {
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;
        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
    }
  }

  return downloadURL;
};

// Delete a file
export const deleteFile = () => {
  // Create a reference to the file to delete
  const desertRef = ref(storage, "images/desert.jpg");

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};
