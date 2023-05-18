import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/signUpForm.jsx";
import SignInForm from "../../components/sign-in-form/signInForm";
import "./authentication.styles.scss";

const Authentication = () => {
  //we use useEfefct() when signing in with redirect to be able to store the UserCredentialImpl which would dissapear because of unmounting when redirecting
  useEffect(() => {
    const fetchData = async () => {
      const response = await getRedirectResult(auth);
      // const response = await getRedirectResult(auth);
      console.log("response from getRedirectResult", response);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    };

    fetchData();
  }, []);
  //empty array => run the function just once when the component is being mounted
  //it will run when mounting as well when we get back to the sign in page after the redirect

  //Moved to SignInForm
  // //whenever you make a call to a DB it's gonna be async
  // const logGoogleUser = async () => {
  //   const response = await signInWithGooglePopup();
  //   //Open console in browser => UserCredentialImpl obj => accessToken
  //   console.log("response", response);

  //   const userDocRef = await createUserDocumentFromAuth(response.user);
  // };

  //   const logGoogleRedirectUser = async () => {
  //     const response = await signInWithGoogleRedirect();
  //     //user is not appearing in the console like at signing in with Google Popup
  //     //in Firestore at authentication the user appears but but nothing appears in the Firebase tab
  //     //our websire redirected us entirely to a diff domain and when we came back our website did not know that there was a previous instance of state of this website that we were being paused for ????
  //     //when being redirected the all website is being unmonuted
  //     //when coming back to the initial website after the redirect we reintialised the entire application from scratch
  //     console.log("logGoogleRedirectUser", response.user);
  //   };

  return (
    <div className="authentication-container">
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
      {/* 
      If uncommented it has use for the useEffect above
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}

      {/* <button onClick={logGoogleRedirectUser}>
        Sign in with Google Redirect
      </button> */}

      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
