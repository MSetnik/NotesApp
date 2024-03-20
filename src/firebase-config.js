
import { Platform } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBslgMLjCgEz9njMHquIKbCJVdahShT-wM",
  authDomain: "notesapp-d5fa2.firebaseapp.com",
  databaseURL: "https://notesapp-d5fa2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "notesapp-d5fa2",
  storageBucket: "notesapp-d5fa2.appspot.com",
  messagingSenderId: "747410975630",
  appId: "1:747410975630:web:df03079e49d918114e52df",
  measurementId: "G-5416VY6H3C"
};

// initializeApp(firebaseConfig);

const Firebase = initializeApp(firebaseConfig);

// const auth = initializeAuth(Firebase);
const auth = Platform.OS === "android" || Platform.OS === "ios" ? initializeAuth(Firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
}) : initializeAuth(Firebase);

export const db = getFirestore();

export default { Firebase, auth, db };
