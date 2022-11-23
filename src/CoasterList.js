import React, { useState } from "react";
import EditModal from "./EditModal";

export default function CoasterList(props) {
  const [editingCoaster, setEditingCoaster] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // Handle the clicks on the edit button. Show the modal for editing
  // with the coaster info in it.
  const handleEditing = (coaster) => {
    setEditingCoaster(coaster);
    setShowEdit(true);
  };

  // Handle save actions on the coaster
  const handleEditSaves = (coaster, id) => {
    props.updateCallback(coaster, id);
    setShowEdit(true);
  };

  return (
    <>
      <EditModal
        show={showEdit}
        setShow={setShowEdit}
        editingCoaster={editingCoaster}
        saveCallback={handleEditSaves}
      />
      <div className="container mt-5">
        {/* If props.coasters is defined, map the values into HTML */}
        {props.coasters
          ? props.coasters.map((coaster, index) => {
              return (
                <div key={index} className="card mb-3 p-2">
                  <h1>{coaster.name}</h1>
                  <div className="card-body">
                    <ul>
                      <li>Location: {coaster.location}</li>
                      <li>
                        URL: <a href={coaster.url}>{coaster.url}</a>
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => props.deleteCallback(coaster.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEditing(coaster)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
