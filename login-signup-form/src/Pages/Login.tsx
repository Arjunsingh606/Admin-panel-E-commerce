import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../style/login.css";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import { getusers } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from 'react-router-dom';

interface formBannerProps {
  image: string;
}

const Login: React.FC<formBannerProps> = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state: RootState) => state.user.data);
  const loggedInUser = user.find(
    (user) => user.email === formData.email && user.confirmPass === formData.password
  );

 

  const validationRules: Record<string, (value: string) => string> = {
    email: (value) => {
      if (!value.trim()) {
        return "Email is required";
      } else {
        const checkEmail =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!checkEmail.test(String(value).toLowerCase())) {
          return "Invalid format of email address";
        }
      }
      return "";
    },
    password: (value) => {
      if (!value.trim()) {
        return "Password is required";
      } else {
        const checkPassword =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return checkPassword.test(value)
          ? ""
          : "Enter correct password";
      }
    },
  };

  const validateField = (fieldName: string, value: string) => {
    const error = validationRules[fieldName](value);
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    validateField(fieldName, value);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    Object.keys(formData).forEach((field) => {
      const key = field as keyof typeof formData;
      const error = validationRules[key](formData[key]);
      newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      await dispatch(getusers());
      if (loggedInUser) {
        const loginId: any = loggedInUser.id;
        sessionStorage.setItem("loginId", loginId);
        navigate('/home');
      } else {
        alert("The email address and password you've entered does'nt match any account, Please login with valid account");
        setFormData({
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <>
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
                <h3 className="text-start">Login</h3>
                <p className="text-start border-bottom">
                  Enter your credentials to access your account
                </p>
                <Form.Group
                  className={`mb-3 form-field ${errors.email ? "border-error" : ""}`}
                  controlId="formBasicEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    value={formData.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    onBlur={() => validateField("email", formData.email)}
                  />
                  <span className="error-text">{errors.email}</span>
                </Form.Group>

                <Form.Group
                  className={`mb-3 form-field ${errors.password ? "border-error" : ""}`}
                  controlId="formBasicPassword"
                >
                  <div className="password-title">
                    <Form.Label>Password</Form.Label>
                    <p>
                      <Link to="/forgetPassword"> Forget Password?</Link>
                    </p>
                  </div>

                  <Form.Control
                    type="password"
                    name="password"
                    placeholder=""
                    value={formData.password}
                    onChange={(e) => handleFieldChange("password", e.target.value)}
                    onBlur={() => validateField("password", formData.password)}
                  />
                  <span className="error-text">{errors.password}</span>
                </Form.Group>

                <Button
                  onClick={handleLogin}
                  className="form-btn"
                  variant="primary"
                  type="submit"
                >
                  Login
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
    </>
  );
};

export default Login;