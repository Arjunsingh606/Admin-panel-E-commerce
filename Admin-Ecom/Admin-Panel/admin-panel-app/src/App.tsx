import "./App.css";
import Dashboard from "./components/admin-panel-dashboard/Dashboard";
import { Routes, Route} from "react-router-dom";
import Products from "./components/admin-panel-dashboard/Products/Products";
import Users from "./components/admin-panel-dashboard/Users";
import Carts from "./components/admin-panel-dashboard/cartItem/Carts";
import Login from "./components/admin-authentication/Login";
import Register from "./components/admin-authentication/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='/dashboard/products' element={<Products />} />
          <Route path='/dashboard/users' element={<Users />} />
          <Route path='/dashboard/carts' element={<Carts />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
