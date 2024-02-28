import React, { useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';

interface FormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate()

  const user = sessionStorage.getItem("loginUser");

  let userName;
  if (user) {
    const getUser: FormValues = JSON.parse(user);
    userName = `${getUser.firstName}  ${getUser.lastName}`
  }

  const handleLogout = () => {
    sessionStorage.removeItem("loginUser");
    navigate("/")
  }


  return (
    <Navbar className="bg-body-tertiary justify-content-between align-items-center header-title">
      <Navbar.Brand href="#">Ticket dashboard</Navbar.Brand>
      <div className='d-flex align-items-center gap-3'>
        <span>{userName} </span>
        <Button onClick={handleLogout} variant="primary">Logout</Button>
      </div>
    </Navbar>
  )
}

export default Header;
