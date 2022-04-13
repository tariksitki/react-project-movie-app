
/// baslangicta npm install firebase demeyi unutmuyoruz.


import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCNciwQzlfob47nVlEmpFCIuZwgS1mBVjk",
    authDomain: "movie-app-82a38.firebaseapp.com",
    projectId: "movie-app-82a38",
    storageBucket: "movie-app-82a38.appspot.com",
    messagingSenderId: "612236686472",
    appId: "1:612236686472:web:8854e5e0b2ee2c77965b3d"
  };

// Initialize Firebase
// bunu ve auth u tüm sayfada bir kez tanimlamamiz yeterli hepsinde kullanilir
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);



    /// Sign up : Create New User:
    // burada kullandigimiz func lar async yapida. bu nedenle promise yada async kullanmaliyiz

export let createUser = async (email, password, navigate) => {
    try {
        let userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential);
    navigate("/");

    } catch (error) {
        alert(error.message)
    }
};

/// sign up yapan kullanicilarimizi,  firebase sitesinde authentication icinde user kismin ´da görebiliyoruz.



/// register yapan bir kullanici, ayni email ile tekrar register olamaz. bu nedenle simdi sign in yani login islemi yapacagiz.




export const signIn = async (email, password, navigate)  => {
    try {
        let userCredential = await signInWithEmailAndPassword(auth, email, password)
        navigate("/")
    } catch (error) {
        alert(error)
    }
}
  




        /////// signout:
        // signout islemini navbar da logout butonuna ekliyoruz
    export const logOut = async () => {
        try {
            signOut(auth);
            alert("Logout Succesfully")
        } catch (error) {
            alert(error)
        }
    }
       