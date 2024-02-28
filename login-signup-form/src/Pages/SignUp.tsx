import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { userPostData, getusers } from "../store/userSlice";
import "../style/login.css";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";

interface formBannerProps {
  image: string;
}

const SignUp: React.FC<formBannerProps> = (props) => {
  const [user, setUser] = useState({firstName: "", lastName: "", email: "", password: "", confirmPass: "",});
  

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const userData = useAppSelector((state: RootState) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getusers());
  }, [dispatch]);

  const validationRules: Record<string, (value: string) => string> = {
    firstName: (value) => (value.trim() ? "" : "First Name is required"),
    lastName: (value) => (value.trim() ? "" : "Last Name is required"),
    email: (value) => {
      if (!value.trim()) {
        return "Email is required";
      }
      const checkEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!checkEmail.test(String(value).toLowerCase())) {
        return "Invalid format of email address";
      }
      if (value && userData.find((user) => user.email === value)) {
        return "This email already exists! Try with a different email";
      }
      return "";
    },
    password: (value) => {
      if (!value.trim()) {
        return "Password is required";
      }
      const checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      return checkPassword.test(value)
        ? ""
        : "Passwords should be like 'Test@1234', min 8 char";
    },
    confirmPass: (value) => {
      if (!value.trim()) {
        return "Password is required";
      }
      return value === user.password ? "" : "Passwords do not match";
    },
  };
  
  const validateForm = (fieldName?: string, value?: string) => {
    const newErrors: Record<string, string> = {};
  
    if (fieldName && value !== undefined) {
      const key = fieldName as keyof typeof user;
      const error = validationRules[key](value);
      newErrors[key] = error;
    } else {
      Object.keys(user).forEach((field) => {
        const key = field as keyof typeof user;
        const error = validationRules[key](user[key]);
        newErrors[key] = error;
  
        if (touchedFields[key] && user[key].trim() === "") {
          newErrors[key] = validationRules[key](user[key]);
        }
      });
    }
  
    setErrors(newErrors);
    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      [fieldName as string]: true,
    }));
    return Object.values(newErrors).every((error) => error === "");
  };
  
  const isInvalid = (fieldName: string) => {
    return touchedFields[fieldName] && errors[fieldName] !== undefined && errors[fieldName] !== "";
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setUser((prevUser) => ({ ...prevUser, [fieldName]: value }));
    validateForm(fieldName, value);
    setTouchedFields((prevTouched) => ({ ...prevTouched, [fieldName]: true }));
  };


  const handleSubmitBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setTouchedFields({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPass: true,
    });

    if (validateForm()) {
      try {
        const { password, ...userDetails } = user;
        await dispatch(userPostData(userDetails));

        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPass: "",
        });
        setTouchedFields({});
        setErrors({});
        alert("Registration is successful. You can log in now");
      } catch (error) {
        alert("Something went wrong ! Please try again");
      }
    }
  }

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
              <Form className=" ">
                <h3 className="text-start">SignUp</h3>
                <Form.Group className={`form-field ${isInvalid("firstName") ? "border-error" : ""}`}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    value={user.firstName}
                    onChange={(e) => handleFieldChange("firstName", e.target.value)}
                    type="text"
                    name="firstName"
                    placeholder=""
                    className="focus-ring"
                  />
                  <span className="error-text">{errors.firstName}</span>
                </Form.Group>
                <Form.Group className={`form-field ${isInvalid("lastName") ? "border-error" : ""}`}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    value={user.lastName}
                    onChange={(e) =>
                      handleFieldChange("lastName", e.target.value)
                    }
                    type="text"
                    name="lastName"
                    placeholder=""
                  />
                  <span className="error-text">{errors.lastName}</span>
                </Form.Group>
                <Form.Group className={`form-field ${isInvalid("email") ? "border-error" : ""}`}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={user.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                  />
                  <span className="error-text">{errors.email}</span>
                </Form.Group>
                <Form.Group className={`form-field ${isInvalid("password") ? "border-error" : ""}`}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={user.password}
                    onChange={(e) =>
                      handleFieldChange("password", e.target.value)
                    }
                    type="password"
                    name="password"
                    placeholder=""
                  />
                  <span className="error-text">{errors.password}</span>
                </Form.Group>
                <Form.Group className={`form-field ${isInvalid("confirmPass") ? "border-error" : ""}`}>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    value={user.confirmPass}
                    onChange={(e) =>
                      handleFieldChange("confirmPass", e.target.value)
                    }
                    type="password"
                    name="confirmPass"
                    placeholder=""
                  />
                  <span className="error-text">{errors.confirmPass}</span>
                </Form.Group>
                <Button
                  onClick={handleSubmitBtn}
                  className="form-btn"
                  type="submit"
                >
                  Sign Up
                </Button>
                <div className="sign-up-link">
                  Already a member?
                  <span>
                    <Link to="/"> Login now </Link>
                  </span>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;






























