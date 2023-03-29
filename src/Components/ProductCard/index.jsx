import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import image from "../../download.svg";

import { useDispatch } from "react-redux";
import { updateProduct, deleteProduct } from "../../Data/ProductsSlice";

import store from "../../store";

import { getUserById } from "../../utils/products/functions";
function index({ product }) {
  const ViewButton = ({ product }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button
          variant="secondary"
          id={product.id}
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
            <Modal.Title>{product.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="productModal">
            <img
              className="cardProductImg"
              src={product.productImg ? product.productImg : image}
              alt={product.name}
            />

            <div>
              <b>Name: &nbsp; </b>
              {product.name}
            </div>
            <div>
              <b>Price: &nbsp; </b>
              {product.price}
            </div>
            <div>
              <b>Sold By: &nbsp; </b>
              {getUserById(product.soldBy)}
            </div>
            <div>
              <b>Category: &nbsp; </b>
              {product.category}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const UpdateButton = ({ product }) => {
    const dispatch = useDispatch();
    const products = store.getState().ProductsSlice.products;
    const categories = store.getState().CategoriesSlice.categories;

    const [show, setShow] = useState(false);

    const [updateName, setUpdateName] = useState(product.name);
    const [updatePrice, setUpdatePrice] = useState(product.price);

    // const [updateCategory, setUpdateCategory] = useState(product.category);
    const updateCategory = useRef();

    const [updateURL, setUpdateURL] = useState(product.productImg);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdateInfo = (e) => {
      e.preventDefault();
      const updatedata = {
        id: product.id,
        name: updateName,
        price: updatePrice,
        category: updateCategory.current.value,
        productImg: updateURL,
        soldBy: product.soldBy,
      };

      dispatch(updateProduct({ products, updatedata }));
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
              {product.name}
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
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={updatePrice}
                  onChange={(e) => {
                    setUpdatePrice(e.target.value);
                  }}
                />
              </Form.Group>
              {/* 
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={updateCategory}
                  onChange={(e) => {
                    setUpdateCategory(e.target.value);
                  }}
                />
              </Form.Group> */}

              <Form.Group className="mb-3" controlId="">
                <Form.Label>Category</Form.Label>
                <Form.Select ref={updateCategory}>
                  <option value="N/A">N/A</option>
                  {categories.map((category) => {
                    return (
                      <option value={category.name}>{category.name}</option>
                    );
                  })}
                  {/* <option>Furniture</option>
          <option>Appral</option>
          <option>Shoes</option> */}
                  {/* <option>Category 4</option> */}
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Sold By</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  value={
                    getUserById(product.soldBy)
                      ? getUserById(product.soldBy)
                      : "N/A"
                  }
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Img URL</Form.Label>
                <Form.Control
                  type="text"
                  value={updateURL}
                  onChange={(e) => setUpdateURL(e.target.value)}
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

  const DeleteButton = ({ product }) => {
    {
      const [show, setShow] = useState(false);
      const dispatch = useDispatch();
      const products = store.getState().ProductsSlice.products;
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const payload = {
        products: products,
        productId: product.id,
      };
      const handleDelete = () => {
        dispatch(deleteProduct(payload));
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
                {product.name}
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
      <Card.Img
        variant="top"
        src={product.productImg ? product.productImg : image}
        alt={product.name}
      />
      <Card.Body>
        <Card.Title className="userCardTitle">{product.name}</Card.Title>
        <Card.Text className="userCardBody">
          <div>
            <b>Price: &nbsp;</b>
            {product.price}
          </div>
          <div>
            <b>Category: &nbsp;</b>
            {product.category}
          </div>
          <div>
            <b>Sold By: &nbsp;</b>
            {getUserById(product.soldBy)}
          </div>
        </Card.Text>
        <div className="card_buttons">
          <ViewButton product={product} />
          <UpdateButton product={product} />
          <DeleteButton product={product} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default index;
