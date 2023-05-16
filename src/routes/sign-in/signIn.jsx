import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

const SignIn = () => {
  //whenever you make a call to a DB it's gonna be async
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    //Open console in browser => UserCredentialImpl obj => accessToken
    console.log("response", response);

    const userDocRef = await createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
