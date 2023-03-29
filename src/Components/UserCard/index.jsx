import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import image from "../../download.svg";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser } from "../../Data/UsersSlice";

function index({ user }) {
  const ViewButton = ({ user }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button
          variant="secondary"
          id={user.id}
          value="view"
          Launch
          static
          backdrop
          modal
          onClick={handleShow}
        >
          View
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{user.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <b>Email: &nbsp; </b>
              {user.email}
            </div>
            <div>
              <b>Phone Number: &nbsp; </b>
              {user.phoneNumber}
            </div>
            <div>
              <b>Address: &nbsp; </b>
              {user.address}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const UpdateButton = ({ user }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const users = useSelector((state) => state.UsersSlice.users);

    const [updateName, setUpdateName] = useState(user.name);
    const [updateEmail, setUpdateEmail] = useState(user.email);
    const [updatePhoneNum, setUpdatePhoneNum] = useState(user.phoneNumber);
    const [updateAddress, setUpdateAddress] = useState(user.address);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdateInfo = (e) => {
      e.preventDefault();
      const updatedata = {
        id: user.id,
        name: updateName,
        email: updateEmail,
        phoneNumber: updatePhoneNum,
        address: updateAddress,
      };
      // console.log("Updatres");
      dispatch(updateUser({ users, updatedata }));
    };

    return (
      <>
        <Button variant="success" onClick={handleShow}>
          Update
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <b>Update:&nbsp;</b>
              {user.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateInfo}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={updateName}
                  onChange={(e) => {
                    setUpdateName(e.target.value);
                  }}
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={updateEmail}
                  onChange={(e) => {
                    setUpdateEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={updatePhoneNum}
                  onChange={(e) => {
                    setUpdatePhoneNum(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={updateAddress}
                  onChange={(e) => setUpdateAddress(e.target.value)}
                />
              </Form.Group>
              <Button variant="dark" type="submit" className="text-center">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  const DeleteButton = ({ user }) => {
    {
      const [show, setShow] = useState(false);
      const dispatch = useDispatch();
      const users = useSelector((state) => state.UsersSlice.users);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const payload = {
        users: users,
        userId: user.id,
      };
      const handleDelete = () => {
        dispatch(deleteUser(payload));
        setShow(false);
      };
      return (
        <>
          <Button variant="danger" onClick={handleShow}>
            Delete
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>DELETE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You're about to delete this{" "}
              <b>
                {user.name}
                <i>!</i>
              </b>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                DELETE
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title className="userCardTitle">{user.name}</Card.Title>
        <Card.Text className="userCardBody">
          <div>{user.email}</div>
          <div>{user.phoneNumber}</div>
          <div>{user.address}</div>
        </Card.Text>
        <div className="card_buttons">
          <ViewButton user={user} />
          <UpdateButton user={user} />
          <DeleteButton user={user} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default index;
