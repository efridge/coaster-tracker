import React, { useState } from "react";

export default function CoasterForm(props) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [url, setURL] = useState("");

  const locations = ["USA", "Europe", "Asia"];

  //respond to input changes
  const handleNameChange = (event) => setName(event.target.value);
  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleUrlChange = (event) => setURL(event.target.value);

  const handleFormSubmit = (event) => {
    props.newCoasterCallback({ name, location, url });
    event.preventDefault();
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit} method="post">
        <div className="form-group mt-3">
          <label htmlFor="coasterName">Coaster Name</label>
          <input
            className="form-control"
            id="coasterName"
            name="coasterName"
            onChange={handleNameChange}
            value={name}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="coasterLocation">Coaster Location</label>
          <select
            onChange={handleLocationChange}
            id="coasterLocation"
            name="coasterLocation"
            value={location}
            className="form-select"
            aria-label="List of locations"
          >
            <option value="">Choose a Location</option>
            {locations.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="coasterUrl">Coaster URL</label>
          <input
            className="form-control"
            id="coasterUrl"
            name="coasterUrl"
            onChange={handleUrlChange}
            value={url}
          />
        </div>
        <input type="submit" value="Add" className="btn btn-primary mt-3"/>
      </form>
    </div>
  );
}
