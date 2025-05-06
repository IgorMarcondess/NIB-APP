import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCanJzmPoAzZemn-gW8LULWzPy-HL47vUg",
  authDomain: "projectteethdiary.firebaseapp.com",
  databaseURL: "https://projectteethdiary-default-rtdb.firebaseio.com",
  projectId: "projectteethdiary",
  storageBucket: "projectteethdiary.firebasestorage.app",
  messagingSenderId: "751951967875",
  appId: "1:751951967875:web:9b7809bf27c82ba1ef4db6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database, app };
