import React from "react";
import CoasterForm from "./CoasterForm.js";
import CoasterList from "./CoasterList.js";
import { Link } from "react-router-dom";

// Auth support
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Coasters(props) {
  // The auth instance + the state of the auth
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  // Callback that will sign the user out of the app
  const handleSignOut = () => {
    signOut(auth).catch((err) => console.error(err)); //log any errors for debugging
  };

  if (loading) { //still waiting
    return <p>Initializing user</p>;
  }

  if (error) { //error logging in
    return <p>Error: {error}</p>;
  }

  if (user) {
    //user is defined, so show the greeting
    return (
      <>
        <p>Welcome, {user.displayName}!</p>
        <button className="btn btn-primary" onClick={handleSignOut}>
          Sign Out
        </button>
        <hr />
        <h2>Create A Coaster</h2>
        <CoasterForm newCoasterCallback={props.handleCreate} />
        <CoasterList
          coasters={props.coasters}
          deleteCallback={props.handleDelete}
          updateCallback={props.handleUpdate}
        />
      </>
    );
  } else {
    //user is undefined
    return (
      <p>
        Please <Link to="/login">sign in</Link>
      </p>
    );
  }
}

export default Coasters;
