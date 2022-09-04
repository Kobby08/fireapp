// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIwHDYPxx7QuXKaOFWy7Ry2lA9pcFz_L4",
  authDomain: "fireapp-cd500.firebaseapp.com",
  projectId: "fireapp-cd500",
  storageBucket: "fireapp-cd500.appspot.com",
  messagingSenderId: "1001343932447",
  appId: "1:1001343932447:web:07d214bdd3098b8b7f5d2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore();
const auth = getAuth();

// Collection reference
const colRef = collection(db, "books");

// queries
const q = query(
  colRef,
  // where("author", "==", "Noah Jons"),
  orderBy("createdAt")
);

// get real time collection data
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });

  console.log(books);
});

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

// getting a single document
const docRef = doc(db, "books", "g0FLhCtnxDgvV5uFMUG1");

// getDoc(docRef).then((doc) => {
//   console.log(doc.data(), doc.id);
// });

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// updating a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", updateForm.id.value);

  updateDoc(docRef, { title: "updated title" }).then(() => {
    updateForm.reset();
  });
});
