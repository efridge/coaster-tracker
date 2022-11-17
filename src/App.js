import React, { useState } from "react";
import CoasterForm from "./CoasterForm.js";
import CoasterList from "./CoasterList.js";

import "./App.css";
//import the function from the realtime database module
//import { getDatabase, ref } from 'firebase/database';

function App() {
  const [coasters, setCoasters] = useState([]);

  // Get a reference to the database service
  //const db = getDatabase();

  //get reference to the "people"" property in the database
  //const coastersRef = ref(db, "coasters")

  const handleNewCoaster = (coasterObj) => {
    console.log(coasterObj);
    setCoasters([...coasters, coasterObj]);
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
