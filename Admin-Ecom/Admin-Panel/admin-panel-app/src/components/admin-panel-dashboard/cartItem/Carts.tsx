import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { CartItems } from "../../../interface/InterfaceProduct";
import ViewModal from "./ViewModal";
import "./cart.css";
import { RegisterFields } from "../../../interface/InterfaceAuth";

interface CartProps {
  cart?: CartItems[];
  users?: RegisterFields[];
}

const Carts: React.FC<CartProps> = ({ cart, users }) => {
  const [show, setShow] = useState(false);
  const [cartItemId, setCartItemId] = useState<number | string>();

  const handleCartView = (id?: number) => {
    setShow(true);
    setCartItemId(id);
  };
  const handleClose = () => setShow(false);

  // const loginCustomerItems = cart.filter((item) => item.prod === customer?.id)
  // const cartTotalQuantity = cartQuantity.reduce((prevQuantity: number, currentQuantity: number) => prevQuantity + currentQuantity, 0)

  return (
    <div>
      <h3>cart page</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item, index) => (
              <>
                {cart &&
                  cart.map(
                    (cartItem) =>
                      cartItem.userId === item.id && (
                        <tr key={cartItem.id}>
                          <td>{item.uuid}</td>
                          <td>{cartItem.quantity}</td>
                          <td>{cartItem.totalPrice}</td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() => handleCartView(cartItem.id)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      )
                  )}
              </>
            ))}
          <ViewModal
            cart={cart}
            show={show}
            handleClose={handleClose}
            cartItemId={cartItemId}
          />
        </tbody>
      </Table>
    </div>
  );
};

export default Carts;
