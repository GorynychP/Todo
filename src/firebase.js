import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBxKP5x1Rxo-RS5wQW3YYJdT4_F__L4g-U",
  authDomain: "todo-list-36337.firebaseapp.com",
  projectId: "todo-list-36337",
  storageBucket: "todo-list-36337.appspot.com",
  messagingSenderId: "1085554253626",
  appId: "1:1085554253626:web:106161f7c47bd376a53a03",
  databaseURL: "https://todo-list-36337-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)
