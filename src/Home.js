import React, { useState, useEffect } from "react";
import CoasterForm from "./CoasterForm.js";
import CoasterList from "./CoasterList.js";
import { db } from "./firebase-db.js";
import { onValue, ref, remove, push as firebasePush } from "firebase/database";
import { Link } from "react-router-dom";

// Auth support
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function HomePage() {
  const [coasters, setCoasters] = useState([]);

  // Auth
  const auth = getAuth();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      // Every time a new version of "coasters" comes down from the DB, update the local state
      console.log(`coasters/${user.uid}`);
      const coastersRef = ref(db, `coasters/${user.uid}`);
      return onValue(coastersRef, (snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {
          const coasterArray = [];
          for (let [id, coaster] of Object.entries(data)) {
            coasterArray.push({ ...coaster, id });
          }
          setCoasters(coasterArray);
        }
      });
    } else {
      console.log("no user");
    }
  }, [user]);

  const handleNewCoaster = (coasterObj) => {
    if (user) {
      //get a reference to where sarah's age is stored in the database
      const coastersRef = ref(db, `coasters/${user.uid}`);

      // Set the value in firebase. This will update our local state on the return trip from the db.
      firebasePush(coastersRef, coasterObj);
    } else {
      console.error("User is not logged in!");
    }
  };

  // The id will be the value that firebase has given it
  const handleDelete = (coasterId) => {
    if (user) {
      const coastersRef = ref(db, `/coasters/${user.uid}/${coasterId}`);

      // Note, refresh isn't working for deletes so we handle that manually in state
      remove(coastersRef).then(() => {
        setCoasters(coasters.filter((coaster) => coaster.id !== coasterId));
      });
    } else {
      console.error("User is not logged in!");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">Coaster Tracker</span>
        </div>
      </nav>
      <div className="container">
        <p>Gee I sure do love roller coasters. Oh yeah!!!</p>
        <Greeting
          coasters={coasters}
          handleNewCoaster={handleNewCoaster}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

function Greeting(props) {
  // Auth
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const handleSignOut = () => {
    signOut(auth).catch((err) => console.log(err)); //log any errors for debugging
  };

  if (loading) {
    //still waiting
    return <p>Initializing user</p>;
  }

  if (error) {
    //error logging in
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
        <h2>Create A Coaster</h2>
        <CoasterForm newCoasterCallback={props.handleNewCoaster} />
        <CoasterList
          coasters={props.coasters}
          deleteCallback={props.handleDelete}
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

export default HomePage;
