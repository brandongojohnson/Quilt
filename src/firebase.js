import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB17xdbEc7KWCZW-QuQRqp7SJPmfEwdzDE",
  authDomain: "contact-list-66177.firebaseapp.com",
  databaseURL: "https://contact-list-66177-default-rtdb.firebaseio.com",
  projectId: "contact-list-66177",
  storageBucket: "contact-list-66177.appspot.com",
  messagingSenderId: "75123161289",
  appId: "1:75123161289:web:ad913eb06de13a27c73518",
  measurementId: "G-9Q5K0D2Y9S"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db, app};