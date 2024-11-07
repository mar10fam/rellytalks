import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9ZYHuOmmuh1lScFMdjlKY7XFVJ9nWX8M",
  authDomain: "rellytalks-a87fc.firebaseapp.com",
  projectId: "rellytalks-a87fc",
  storageBucket: "rellytalks-a87fc.appspot.com",
  messagingSenderId: "1080632874837",
  appId: "1:1080632874837:web:22af10f4ea39467cd941dc"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);