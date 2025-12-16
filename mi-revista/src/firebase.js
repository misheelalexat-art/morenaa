// Import Firebase core
import { initializeApp } from "firebase/app";

// Import auth
import { getAuth } from "firebase/auth";

// Import Firestore
import { getFirestore } from "firebase/firestore";

// Import Storage (🔥 ESTE FALTABA)
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvxOMrdCFqIJpl-Y5ZabeHLAMISKBUfPQ",
  authDomain: "morena-47e1b.firebaseapp.com",
  projectId: "morena-47e1b",
  storageBucket: "morena-47e1b.firebasestorage.app",
  messagingSenderId: "89315383160",
  appId: "1:89315383160:web:e38f7e095566f6d1969a8d",
  measurementId: "G-JD6ZM5M33Q"
};

// Inicializar app
const app = initializeApp(firebaseConfig);

// Exportar Auth
export const auth = getAuth(app);

// Exportar Firestore
export const db = getFirestore(app);

// ✅ Exportar Storage
export const storage = getStorage(app);
