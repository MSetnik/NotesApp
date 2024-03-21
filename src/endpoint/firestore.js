/* eslint-disable no-new */
import { db } from "../firebase-config";
import { doc, addDoc, collection, updateDoc, onSnapshot, query, deleteDoc, orderBy } from "firebase/firestore";
import { actions, createAction } from "../store/actions";

export const getUserNotes = async (userId, dispatch) => {
  dispatch(createAction(actions.NOTES_LOADER, true));

  new Promise((resolve, reject) => {
    const q = query(collection(db, "users", userId, "notes"), orderBy("date", "desc"));
    onSnapshot(q, { includeMetadataChanges: true }, (querySnapshot) => {
      console.log(querySnapshot.metadata.fromCache);
      const notes = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        notes.push({ firestoreId: doc.id, ...doc.data() });
      });

      dispatch(createAction(actions.NOTES_LOADER, false));
      dispatch(createAction(actions.ADD_NOTE, notes));
      resolve(notes);
    },
    (error) => {
      reject(error);
    });
  });
};

export const addUserNote = async (userId, noteData) => {
  console.log(userId, noteData);
  await addDoc(collection(db, "users", userId, "notes"), {
    color: noteData.color,
    content: noteData.content,
    date: noteData.date.toString(),
    id: noteData.id,
    title: noteData.title,
    userId: userId
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const updateUserNote = async (userId, noteId, noteData) => {
  const noteRef = doc(db, "users", userId, "notes", noteId);

  // Set the "capital" field of the city 'DC'
  await updateDoc(noteRef, {
    ...noteData
  })
    .then(() => {
      console.log("Successfully updated");
    })
    .catch(e => {
      console.error(e);
    });
};

export const deleteUserNote = async (userId, noteId) => {
  console.log(userId, noteId);
  // Set the "capital" field of the city 'DC'
  await deleteDoc(doc(db, "users", userId, "notes", noteId));
};
