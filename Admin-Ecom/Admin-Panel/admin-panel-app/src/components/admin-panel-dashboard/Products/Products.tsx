import React, { useState, useEffect } from "react";
import { Table, Image, Button, Modal } from "react-bootstrap";
import AddProductModal from "./AddProductModal";
import './product.css';

const Products = () => {
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [product, setProduct] = useState<any[]>([]);
  const [editedProduct, setEditedProduct] = useState<any>();
  const [deleteProduct, setDeleteProduct] = useState<string>("");

  const getProductData = async () => {
    const response = await fetch("http://localhost:4000/products");
    const getProducts = await response.json();
    setProduct(getProducts);
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleClose = () => {
    setShow(false);
    setShowDeleteModal(false);
    setDeleteProduct("");
  };

  const handleShow = () => setShow(true);

  const handleDeleteShow = (id: any) => {
    console.log(id, "id in modal=======>>>>>>>>>>>>>>")
    setDeleteProduct(id);
    setShowDeleteModal(true);
  };


  const handleDeleteProduct = async () => {
    const id = deleteProduct
    console.log(id, "deleted item id in delete function=>")
    const response = await fetch(`http://localhost:4000/products/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      const updatedProducts: any = product && product.filter((item) => item.id !== id);
      setProduct(updatedProducts!)
      handleClose();
    }
  };

  const editProductDetail = (id: number) => {
    const editedProduct = product.find((item) => item.id === id);
    setEditedProduct(editedProduct);
    handleShow();
  };

  return (
    <div>
      <AddProductModal
        getProductData={getProductData}
        product={product}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        editedProduct={editedProduct}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {product && product.map((item, index: number) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className="product-image">
                  {item.image && item.image.length > 0 ? (
                    <Image
                      src={item.image[0]}
                      alt="Uploading.."
                      className="img-fluid"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button variant="primary" className="btn card-btn edit-btn" onClick={() => editProductDetail(item.id)}>
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    className="btn card-btn"
                    onClick={() => handleDeleteShow(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
          {product && product.length === 0 && <span>Add product</span>}
        </tbody>
      </Table>

      <Modal show={showDeleteModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;