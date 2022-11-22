import React, { useState } from "react";

export default function CoasterForm(props) {

  // If initialization values given, use those to init state
  const [name, setName] = useState( (props.coaster && props.coaster.name) || '');
  const [location, setLocation] = useState( (props.coaster && props.coaster.location) || '');
  const [url, setURL] = useState( (props.coaster && props.coaster.url) || '');

  const locations = ["USA", "Europe", "Asia"];

  // Respond to input changes
  const handleNameChange = (event) => setName(event.target.value);
  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleUrlChange = (event) => setURL(event.target.value);

  const handleFormSubmit = (event) => {
    // Second parameter is an optional id value - will only be used on edits
    props.newCoasterCallback({ name, location, url}, (props.coaster && props.coaster.id) || null );
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
        <input type="submit" value={props.coaster ? 'Edit' : 'Add'} className="btn btn-primary mt-3"/>
      </form>
    </div>
  );
}
