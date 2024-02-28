import React from 'react'
import { useState } from 'react';
import { Button, Modal, Image, Table } from 'react-bootstrap';
import { CartItems } from '../../../interface/InterfaceProduct'

interface ViewModalProps {
    cart?: CartItems[];
    show: boolean;
    handleClose: () => void;
    cartItemId?: number | string | undefined;
}

const ViewModal: React.FC<ViewModalProps> = ({ cart, show, handleClose, cartItemId }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cart Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart && cart.map((item) => item.id === cartItemId && (
                                <tr key={item.id} className='cart-image'>
                                    <td><Image src={item?.image} alt="Uploading.." className="img-fluid" /></td>
                                    <td>{item.productName}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item?.totalPrice}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

            </Modal.Body>
            <Modal.Footer>
               
            </Modal.Footer>
        </Modal>

    )
}

export default ViewModal
