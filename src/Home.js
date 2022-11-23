import React, { useState, useEffect } from "react";
import { db } from "./firebase-db.js";
import { onValue, ref, remove, update, push as firebasePush } from "firebase/database";
import Coasters from "./Coasters.js";

// Auth support
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function HomePage() {
  // Our list of coasters the user has created
  const [coasters, setCoasters] = useState([]);

  // The auth instance + the state of the auth
  const auth = getAuth();
  const [user] = useAuthState(auth);

  // Run this code when the component finishes loading
  useEffect(() => {
    // If we have a logged in user
    if (user) {
      // Get a reference to this specific user's coaster list
      const coastersRef = ref(db, `coasters/${user.uid}`);

      // Every time a new version of the user's list comes down from the DB, update the local state
      return onValue(coastersRef, (snapshot) => {
        const data = snapshot.val();
        if (snapshot.exists()) {

          // Build up an array of user coasters and tack on the id as part of the object
          const coasterArray = [];
          for (let [id, coaster] of Object.entries(data)) {
            coasterArray.push({ ...coaster, id });
          }

          // Set the local state to equal the coasters that came down from firebase
          setCoasters(coasterArray);
        }
      });
    }
  }, [user]);

  // Callback for a new coaster being created.
  // Takes in a coaster object and saves it to the user's coaster list.
  const handleCreate = (coasterObj) => {
    // If a user is logged in
    if (user) {
      // Get a reference to this user's coaster list
      const coastersRef = ref(db, `coasters/${user.uid}`);

      // Set the value in firebase.
      // This will update our local state on the return trip from the db.
      firebasePush(coastersRef, coasterObj);

    // Show an error if this is called while the user isn't logged in
    } else {
      console.error("User is not logged in!");
    }
  };

  // Callback for a coaster being updated.
  // Takes in a coaster object and the id of the existing coaster to update.
  const handleUpdate = (modifiedCoasterObj, coasterId) => {
    // If we have a logged in user and have been given a coaster id.
    if (user && coasterId ) {
      // Get a reference to this specific coaster in the user's list and update it.
      const coastersRef = ref(db, `coasters/${user.uid}/${coasterId}`);
      update(coastersRef, modifiedCoasterObj);
    } else {
      console.error("A logged in user and a coaster id are required");
    }
  };

  // Callback for coaster deletions.
  // The id will be the value that firebase has given it.
  const handleDelete = (coasterId) => {
    // If we have a logged in user, get a reference to this specific coaster.
    if (user) {
      const coastersRef = ref(db, `/coasters/${user.uid}/${coasterId}`);

      // Remove this coaster by reference.
      // Note, refresh isn't working for deletes so we handle that manually in state.
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
        <Coasters
          coasters={coasters}
          handleCreate={handleCreate}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  );
}

export default HomePage;
