import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getusers } from "../store/userSlice";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from 'react-router-dom';

interface ForgetPasswordProps {
  image: string;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(()=>{
    dispatch(getusers())
  }, [])
 
  const user = useSelector((state: RootState) => state.user.data);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loggedInUser = user.find((user) => user.email === email);
 
  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (loggedInUser?.email !== email) {
      setError("This email is not registered! Try with a valid email");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if(validateEmail() ){
      await dispatch(getusers());
      if (loggedInUser) {
        const userId: any = loggedInUser.id;
        sessionStorage.setItem("userId", userId);
        navigate('/otp');
      } 
    }
  };

  return (
    <div>
      <div className="container-fluid form-body">
        <div className="row user-form">
          <div className="col-md-6 form-size form-banner">
            <div className="form-banner">
              <img className="img-fluid form-image" src={props.image} alt="loading" />
            </div>
          </div>
          <div className="col-md-4 form-size">
            <div className="main-form">
              <Form>
                <h3 className="text-start">Forget Your Password</h3>
                <p className="text-start border-bottom">
                  Enter the email address associated with your account, and we'll
                  help you reset your password.
                </p>
                <Form.Group
                  className={`mb-3 form-field ${error ? "border-error" : ""}`}
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && <span className="error-text">{error}</span>}
                </Form.Group>
                <Button
                  onClick={handleSubmit}
                  className="form-btn"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <div className="sign-up-link">
                  <p>
                    Not a member?
                    <span>
                      <Link to="/signUp"> Sign up</Link>
                    </span>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
