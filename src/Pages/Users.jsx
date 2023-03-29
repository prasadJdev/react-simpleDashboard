import React, { useState, useRef, useEffect } from "react";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Modal from "../Components/Modal";
import Alert from "react-bootstrap/Alert";

import UserCard from "../Components/UserCard";
import { useDispatch, useSelector } from "react-redux";

import { addUser, loadStoredDataToState } from "../Data/UsersSlice";

import { v4 as uuidv4 } from "uuid";

export var storedUsers = [];

export default function Users() {
  
  const [searchText, setSearchText] = useState("");

  const users = useSelector((state) => state.UsersSlice.users);

  const dispatch = useDispatch();

  
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const LOCAL_STORAGE_KEY = "Users.usersData";
  useEffect(() => {
    storedUsers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedUsers) dispatch(loadStoredDataToState(storedUsers));
  }, []);

  return (
    <>
      <div className="searchNav">
        <div className="total_count">
          {" "}
          <div className="total_count_filter">
            {
              users.filter(
                (user) =>
                  user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchText.toLowerCase()) ||
                  user.phoneNumber
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                  user.address.toLowerCase().includes(searchText.toLowerCase())
              ).length
            }{" "}
          </div>
          <span>&nbsp; | &nbsp; </span>
          <div  className="total_count_users">{users.length} </div>
        </div>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <Button variant="secondary" onClick={handleShow}>
          Add User
        </Button>
        <Modal
          show={show}
          addText="Add User"
          ModalContent={modalContent}
          handleClose={handleClose}
        />
      </div>
      <div className="useresGrid">
        {users
          .filter(
            (user) =>
              user.name.toLowerCase().includes(searchText.toLowerCase()) ||
              user.email.toLowerCase().includes(searchText.toLowerCase()) ||
              user.phoneNumber
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              user.address.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((user) => {
            return <UserCard key={user.id} user={user} />;
          })}
      </div>
    </>
  );
}

function modalContent() {
  const dispatch = useDispatch();
  
  const existing = useSelector((state) => state.UsersSlice.users);

  const [userName_form, setUserName_form] = useState("");
  const [userEmail_form, setUserEmail_form] = useState("");
  const [userPhone_form, setUserPhone_form] = useState("");
  const [userAdd_form, setUserAdd_form] = useState("");

  const [alret, setAlret] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");

  const handleAddUser = (e) => {
    e.preventDefault();
    if (
      userName_form.length < 5 ||
      userPhone_form < 10 ||
      userAdd_form.length < 5
    ) {
      setAlret(!alret);
      setMessage("Fileds are Missing");
      setVariant("danger");
      return;
    }

    const data = {
      id: uuidv4(),
      name: userName_form,
      email: userEmail_form,
      phoneNumber: userName_form,
      address: userAdd_form,
    };
    dispatch(addUser({ data, existing }));
  };
  const Alret = ({ variant, message }) => {
    const [show, setShow] = useState(true);
    if (show) {
      return (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
          <p>{message}</p>
        </Alert>
      );
    }
  };
  return (
    <Form onSubmit={handleAddUser}>
      {alret && <Alret variant={variant} message={message} />}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          value={userName_form}
          onChange={(e) => setUserName_form(e.target.value)}
          type="text"
          placeholder="Enter Name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          value={userEmail_form}
          onChange={(e) => setUserEmail_form(e.target.value)}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Label>Number</Form.Label>
        <Form.Control
          value={userPhone_form}
          onChange={(e) => setUserPhone_form(e.target.value)}
          type="text"
          placeholder="Enter Phone Number"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={userAdd_form}
          onChange={(e) => setUserAdd_form(e.target.value)}
          placeholder="Enter Address"
        />
      </Form.Group>

      <Button variant="secondary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function SearchBar({ searchText, setSearchText }) {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </InputGroup>
    </>
  );
}
