import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './component/user-auth/Login';
import Register from './component/user-auth/Register';
import Dashboard from './component/Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path= "/dashboard" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
