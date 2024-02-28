import React, { useEffect, useState } from 'react'
import Header from './Header'
import { AddProduct, CartItems } from '../interface/InterfaceEcom'
import { RegisterFields } from '../interface/InterfaceAuth'
import { Card } from 'react-bootstrap'
import '../styles/product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import ProductDetails from './ProductDetails'


const Dashboard = () => {
  const [product, setProduct] = useState<AddProduct[]>([])
  const [show, setShow] = useState<boolean>(false);
  const [productId, setProductId] = useState<number | string>();
  const [quantity, setQuantity] = useState<number | undefined>(1);
  const [totalPrice, setTotalPrice] = useState<number | string>()
  const [customer, setCustomer] = useState<RegisterFields>({});
  const [cart, setCart] = useState<CartItems[]>([])

  // const [editQuantity, setEditQuantity] = useState<any>()

  const getProduct = async () => {
    const response = await fetch("http://localhost:4000/products");
    const cartResponse = await fetch("http://localhost:4000/cart")
    const product = await response.json();
    const cartItem = await cartResponse.json();
    const getCurrentUser = sessionStorage.getItem("loginUser");
    const getcustomerName = JSON.parse(getCurrentUser!)

    setProduct(product);
    setCart(cartItem)
    setCustomer(getcustomerName)
  }

  useEffect(() => {
    getProduct()
  }, [])

  const handleProductClick = (id: number | undefined) => {
    setShow(true);
    setProductId(id)
    setQuantity(1)
  }

  const handleClose = () => setShow(false);
  console.log(product, "cart ============>>>>>>>>>>>")

  return (
    <div>
      <Header customer={customer} cart={cart} />
      <div className='product-list'>
        {
          product && product.map((item) => {
            return (
              <div key={item.id} className='product-card' onClick={() => handleProductClick(item.id)}>
                <Card >
                  <Card.Img variant="top" src={item.image[0]} alt="Uploading.." className="img-fluid" />
                  <Card.Body>
                    <Card.Title>{item.productName}</Card.Title>
                    <div className='d-flex justify-content-between'>
                      <Card.Text className='product-price'><FontAwesomeIcon icon={faIndianRupeeSign} /> {item.price}</Card.Text>
                      <Card.Text>Qty :- {item.quantity} </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )
          })
        }
        <ProductDetails cart={cart} setCart={setCart} customer={customer} product={product} handleClose={handleClose} show={show} productId={productId} setQuantity={setQuantity} quantity={quantity} setTotalPrice={setTotalPrice} totalPrice={totalPrice} />
      </div>
    </div>
  )
}

export default Dashboard
