import "./App.css";
import Login from './Pages/Login';
import SignUp from './Pages/SignUp'
import ForgetPassword from './Pages/ForgetPassword';
import Otp from './Pages/Otp';
import ResetPassword from "./Pages/ResetPassword";
import formBanner from './banner/form-banner3.jpg'
import { Routes, Route } from "react-router-dom";
import Home from './components/Home'


const App: React.FC = () => {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login image={formBanner} />} />
        <Route path="/signUp" element={<SignUp image={formBanner} />} />
        <Route path="/forgetPassword" element={<ForgetPassword image={formBanner} />} />
        <Route path="/otp" element={<Otp image={formBanner} />} />
        <Route path="/resetPassword" element={<ResetPassword image={formBanner} />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
