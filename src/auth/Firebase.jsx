/// baslangicta npm install firebase demeyi unutmuyoruz.

/// ÖNEMLI : HOOKLAR SADECE COMPONENTLAR ICINDE KULLANILIR: BURADA ISE COMPONENT IMIZ YOK SADECE FUNC LARIMIZ VARDIR. O NEDENLE NAVIGATE I; BURADAKI FUNC LARIMIZI CAGIRDIGIMIZ YERDEN BURAYA PROPS OLARAK GÖNDERIYORUZ: YA BIR COMPONENT ICINDE YADA CUSTOM HOOK ICINDE KULLANABILIRIZ

import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
// .env dosyasi neden olusturulur. apikey lerimiz ve önemli bilgilerimiz github a gitmesin diye
// ÖNEMLI: .env olusturduktan sonra projeyi yeniden baslatmamiz gerekir.
// .env olustururken basinda REACT_APP olmasi sart
// .env de sifreleri yazarken "" kullanmiyoruz.

// Initialize Firebase
// bunu ve auth u tüm sayfada bir kez tanimlamamiz yeterli hepsinde kullanilir
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

/// Sign up : Create New User:
// burada kullandigimiz func lar async yapida. bu nedenle promise yada async kullanmaliyiz

export let createUser = async (email, password, navigate, displayName) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // create isleminden sonra firebase den bize gelen userCredential icinde displayName null olarak gelir. Bu nedenle kendimiz yeni bir user create esnasinda su sekilde display name üretiyoruz. register sayfasindaki input verilerinden aliyoruz isimleri ve firebase e ait func lari kullaniyoruz.
    // update func ile kullaniciya ait tüm veriler üzerinde degisiklik yapilabilir. diger projelerde kullanilabilir
    // Dikkat: await kullanimi
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });

    console.log(userCredential);
    navigate("/");
    // navigate i try icinde kullandik. cünkü basarili ise homepage e gitmesini istiyoruz. degilse gitmesin
  } catch (error) {
    alert(error.message);
  }
};

/// sign up yapan kullanicilarimizi,  firebase sitesinde authentication icinde user kismin ´da görebiliyoruz.

/// register yapan bir kullanici, ayni email ile tekrar register olamaz. bu nedenle simdi sign in yani login islemi yapacagiz.

export const signIn = async (email, password, navigate) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
    navigate("/");
  } catch (error) {
    alert(error);
  }
};

/////// signout:
// signout islemini navbar da logout butonuna ekliyoruz
export const logOut = async (navigate) => {
  try {
    signOut(auth);
    alert("Logout Succesfully");
    navigate("/")
  } catch (error) {
    alert(error);
  }
};




/// user Observer: 
// Bu func kullanici giris ve cikislarini takip ediyor. Eger giris oldu ise bize bir user object return ediyor. cikislari da takip ediyor.
// context de bir state olusturduk currentUser adinda. o state sürekli güncellemek icin buradaki observer func i orada cagiriyoruz. cagirirken icine setCurrentUser koyuyoruz. ve bu sekilde kullanici bilgisi her degistiginde buradan güncelleme yapiyoruz. 

// observer func vazifesini burada tanimliyoruz. context de sadece cagiriyoruz.

export const userObserver = (setCurrentUser) => {
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setCurrentUser(currentUser)
        } else {
            setCurrentUser(false)
        }
      });
};




/// simdi google ile sign in islemini yapacagiz.
// aciklamasi firebase de var.
// google ile signIn de iki secenek var. birincisi popUp ile
// ikincisi ise redirect ile yani baska bir sayfaya yönlendirme
// firebase sayfasinda optional bircok secenek daha avr ama biz sadece popUp kismini aldik   

// import lari yukarida yaptik

export const signUpProvider = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
    navigate("/");
  }).catch((error) => {
    console.log(error);
  });
};

