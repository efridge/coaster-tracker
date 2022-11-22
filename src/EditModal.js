import React from 'react';
import CoasterForm from "./CoasterForm.js";
import Modal from 'react-bootstrap/Modal';

function EditModal(props) {
  const handleClose = () => props.setShow(false);

  const handleEditAction = (editedCoaster, id) => {
    props.saveCallback(editedCoaster, id);
    handleClose();
  }

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CoasterForm coaster={props.editingCoaster} newCoasterCallback={handleEditAction}/>
      </Modal.Body>
    </Modal>
  );
}

export default EditModal;