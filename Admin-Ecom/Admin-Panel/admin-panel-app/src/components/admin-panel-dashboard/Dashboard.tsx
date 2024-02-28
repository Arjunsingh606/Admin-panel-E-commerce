import { Col, Nav, Row, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import Products from "./Products/Products";
import Users from "./Users";
import Carts from "./cartItem/Carts";
import Header from "./Header";
import "./dashboard.css";
import { RegisterFields, } from "../../interface/InterfaceAuth";
import { CartItems } from '../../interface/InterfaceProduct'
import { useEffect, useState } from "react";


const Dashboard = () => {
    const [users, setUsers] = useState<RegisterFields[]>([])
    const [cart, setCart] = useState<CartItems[]>([])

    const getUsers = async () => {
        const response = await fetch("http://localhost:4000/customer")
        const users = await response.json();
        setUsers(users)
    }
    const getCartDetails = async () => {
        const response = await fetch("http://localhost:4000/cart")
        const cartDetails = await response.json();
        setCart(cartDetails)
    }

    useEffect(() => {
        getUsers();
        getCartDetails();
    }, [])


    const user = sessionStorage.getItem("loginUser");
    let adminName: string;
    if (user) {
        const getUser: RegisterFields = JSON.parse(user);
        adminName = `${getUser.firstName?.charAt(0).toUpperCase()}${getUser.lastName
            ?.charAt(0)
            .toUpperCase()}`;
    }

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="">
            <Row className="mx-0 ">
                <Col sm={3} className="ps-0">
                    <div className="admin-navbar">
                        <h3>Dashboard</h3>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item className="dashboard-link">
                                <Nav.Link eventKey="products" className="dashboard-item">
                                    <div>
                                        <Link to="/dashboard/products">Products</Link>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="users" className="dashboard-item">
                                    <div>
                                        <Link to="/dashboard/users">Users</Link>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="carts" className="dashboard-item">
                                    <div>
                                        <Link to="/dashboard/carts">Carts</Link>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Header adminName={adminName!} />
                        <Tab.Pane eventKey="products">
                            <Products />
                        </Tab.Pane>
                        <Tab.Pane eventKey="users">
                            <Users users={users} setUsers={setUsers}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="carts">
                            <Carts cart={cart} users={users} />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default Dashboard;
