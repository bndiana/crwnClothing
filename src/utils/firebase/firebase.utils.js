import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCI2VBxEWmoXAMNp35rrPRa-qkRTSJoOms",
  authDomain: "crwn-clothing-db-567b3.firebaseapp.com",
  projectId: "crwn-clothing-db-567b3",
  storageBucket: "crwn-clothing-db-567b3.appspot.com",
  messagingSenderId: "591747264500",
  appId: "1:591747264500:web:f41c2fd0519bdc838413a1",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

//GoogleAuthProvider = class that we get from  Firebase Authentication and it's connected to Google Auth itself
//can have diff proverders ex: one for SignInWithPopup and another for SignInWithRedirect
// a provider can be Google or Facebook or Github etc
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

//same autentication from an App throughout all sign in methods
//with auth we can keep track if the user are correctly authenticated or not
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

//directly points to our DB
export const database = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {
    // displayName:
    //   "Additional Name that overwrites is initial displayName is empty",
  }
) => {
  if (!userAuth) return;
  //function that gets the data from the authentication and store it inside of Firestore

  //first we need to see if there's an existing document reference
  const userDocRef = doc(database, "users", userAuth.uid);

  console.log("userDocRef", userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  //on this we can check if diff objs/references exists or not
  console.log("userSnapshot", userSnapshot);

  //.exists() tells us if inside the DB does the reference and the data regarding that reference exists
  //   console.log("userSnapshot.exists()", userSnapshot.exists());

  //check if user data/ snapshot exist
  //if the data doesn't exists=> i want  to create set the document with the data from userAuth in my collection using userSnapshop ==> set the data in our DB = set the doc with this object
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  //if user data exists return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  //   return await createUserDocumentFromAuth(auth, email, password);
  return await createUserWithEmailAndPassword(auth, email, password);
};
