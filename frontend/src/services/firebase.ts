import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWzpFk0VJcWrc0vnJ31UJaRDTVgqiZkn4",
  authDomain: "lovyca-cd774.firebaseapp.com",
  projectId: "lovyca-cd774",
  storageBucket: "lovyca-cd774.appspot.com",
  messagingSenderId: "666976317532",
  appId: "1:666976317532:web:6767c96d069935aceeb699",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
