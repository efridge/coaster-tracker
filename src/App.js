import React, { useState, useEffect } from "react";
import CoasterForm from "./CoasterForm.js";
import CoasterList from "./CoasterList.js";
import { db } from "./firebase-db.js";
import { onValue, ref, set as firebaseSet} from "firebase/database";

import "./App.css";

function App() {
  const [coasters, setCoasters] = useState([]);

  useEffect(() => {
    // Every time a new version of "coasters" comes down from the DB, update the local state
    const query = ref(db, "coasters");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
          setCoasters(data);
      }
    });
  }, []);

  const handleNewCoaster = (coasterObj) => {
    //get a reference to where sarah's age is stored in the database
    const coastersRef = ref(db, "coasters");

    // Set the value in firebase. This will update our local state on the return trip from the db.
    firebaseSet(coastersRef, [...coasters, coasterObj]);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">
            Coaster Tracker
          </span>
        </div>
      </nav>
      <div className="container">
        <p>Gee I sure do love roller coasters. Oh yeah!!!</p>
        <h2>Create A Coaster</h2>
        <CoasterForm newCoasterCallback={handleNewCoaster}/>
        <CoasterList coasters={coasters}/>
      </div>
    </>
  );
}

export default App;
