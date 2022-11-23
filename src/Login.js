//import auth functions and variables from Firebase
import {
  getAuth,
  onAuthStateChanged,
  EmailAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

//import the component
import StyledFirebaseAuth from "./StyledFirebaseAuth";

//an object of configuration values
const firebaseUIConfig = {
  signInOptions: [
    //array of sign in options supported
    //array can include just "Provider IDs", or objects with the IDs and options
    GoogleAuthProvider.PROVIDER_ID,
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
  ],
  signInFlow: "popup", //don't redirect to authenticate
  credentialHelper: "none", //don't show the email account chooser
  callbacks: {
    //"lifecycle" callbacks
    signInSuccessWithAuthResult: () => {
      return false; //don't redirect after authentication
    },
  },
};

//the React compnent to render
function LoginPage() {
  const auth = getAuth(); //access the "authenticator"
  const navigate = useNavigate();

  // Once we know the user has logged in, redirect back home
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      navigate('/');
    }
  });

  return (
    <div>
      <h1>Coaster Tracker</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
    </div>
  );
}

export default LoginPage;
