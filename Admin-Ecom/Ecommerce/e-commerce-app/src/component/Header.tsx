import { Navbar, Dropdown, Table, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { RegisterFields } from '../interface/InterfaceAuth'
import { CartItems } from "../interface/InterfaceEcom";

interface HeaderProps {
    customer?: RegisterFields;
    cart: CartItems[]
}
const Header: React.FC<HeaderProps> = ({ cart, customer }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("loginUser");
        navigate("/");
    };
    const customerName = `${customer?.firstName?.charAt(0).toUpperCase()}${customer?.lastName
        ?.charAt(0)
        .toUpperCase()}`;


    const loginCustomerItems = cart.filter((item) => item.userId === customer?.id)
    // console.log(loginCustomerItems, "cart item in header-=-=--=--==-=-=-==->>>>>")


    const cartPrice: any = loginCustomerItems.map((item) => item.totalPrice);
    const cartQuantity: any = loginCustomerItems.map((item) => item.quantity);
    const cartTotalPrice = cartPrice.reduce((prevPrice: number, currentPrice: number) => prevPrice + currentPrice, 0);
    const cartTotalQuantity = cartQuantity.reduce((prevQuantity: number, currentQuantity: number) => prevQuantity + currentQuantity, 0)

    return (
        <Navbar className="notes-nav p-3 bg-body-tertiary justify-content-between align-items-center header-title">
            <Navbar.Brand href="#home">E-commerce Store</Navbar.Brand>
            <div className="d-flex align-items-center justify-content-between gap-4">

                <Dropdown className="xl">
                    <Dropdown.Toggle className="cart-button" variant="success" id="dropdown-basic">
                        <div className="cart-icon"  >
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span className="cart-items">
                                {loginCustomerItems.length}
                            </span>
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-content">
                        <div className="cart-list">
                            {loginCustomerItems.map((item) => {
                                return (
                                    <div className="cart-item" key={item.productId}>
                                        <div><Image src={item.image} alt={item.productName} /> </div>
                                        <div>Qty - {item.quantity} * {item.price}</div>
                                        <div>{item.totalPrice}</div>
                                    </div>
                                )
                            })}
                        </div>

                        {loginCustomerItems.length === 0 && <h3 className="text-center">Cart is empty</h3>}


                        <div className="cart-total-price">
                            <p>Total Price : {cartTotalPrice}</p>
                            <p>Total Quantity : {cartTotalQuantity} </p>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
                <div className="user-name ">
                    <h5>{customerName} </h5>
                </div>
                <div className="delete-icon">
                    <FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} />
                </div>
            </div>
        </Navbar>
    );
};
export default Header;

