// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNciwQzlfob47nVlEmpFCIuZwgS1mBVjk",
  authDomain: "movie-app-82a38.firebaseapp.com",
  projectId: "movie-app-82a38",
  storageBucket: "movie-app-82a38.appspot.com",
  messagingSenderId: "612236686472",
  appId: "1:612236686472:web:8854e5e0b2ee2c77965b3d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// baslangicta ne yapmamiz gerektigini aciklayan yer, get started da

export const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};
