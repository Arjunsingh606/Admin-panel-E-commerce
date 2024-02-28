import './App.css';
import Dashboard from './components/Dashboard';
import Registeration from './components/users/Registeration';
import Login from './components/users/Login';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registeration />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
