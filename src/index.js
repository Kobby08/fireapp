// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

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

// Initialize service
const db = getFirestore();

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
