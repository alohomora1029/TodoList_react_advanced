import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0fk2Ix63N1z20zFG3VlS9VH5fXjqvnwo",
  authDomain: "todolist-tsx.firebaseapp.com",
  projectId: "todolist-tsx",
  storageBucket: "todolist-tsx.appspot.com",
  messagingSenderId: "974671525330",
  appId: "1:974671525330:web:bf39888774c0876b5e040b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
