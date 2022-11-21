import React, { useState, useEffect } from "react";
import CoasterForm from "./CoasterForm.js";
import CoasterList from "./CoasterList.js";
import { db } from "./firebase-db.js";
import { onValue, ref, remove, push as firebasePush} from "firebase/database";

import "./App.css";

function App() {
  const [coasters, setCoasters] = useState([]);

  useEffect(() => {
    // Every time a new version of "coasters" comes down from the DB, update the local state
    const query = ref(db, "coasters");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        const coasterArray = [];
        for (let [id, coaster] of Object.entries(data)) {
          coasterArray.push({...coaster, id});
        }
          setCoasters(coasterArray);
      }
    });
  }, []);

  const handleNewCoaster = (coasterObj) => {
    //get a reference to where sarah's age is stored in the database
    const coastersRef = ref(db, "coasters");

    // Set the value in firebase. This will update our local state on the return trip from the db.
    firebasePush(coastersRef, coasterObj );
  };

  // The id will be the value that firebase has given it
  const handleDelete = (coasterId) => {
    const coastersRef = ref(db, `/coasters/${coasterId}`);

    // Note, refresh isn't working for deletes so we handle that manually in state
    remove(coastersRef).then( ()=> {
      setCoasters( coasters.filter( coaster=>coaster.id !== coasterId) );
    });
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
        <CoasterList coasters={coasters} deleteCallback={handleDelete}/>
      </div>
    </>
  );
}

export default App;
