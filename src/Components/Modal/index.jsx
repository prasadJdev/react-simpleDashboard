import React from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function index({ show, handleClose, ModalContent, addText }) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <Modal show={show} keyboard={false} backdrop="static" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{addText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalContent />
      </Modal.Body>
    </Modal>
  );
}
