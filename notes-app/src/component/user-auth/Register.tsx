import * as React from "react";
import { Formik, Field, Form } from "formik";
import formBanner from "../../banner/form-banner-1.jpg";
import "../../styles/form.css";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FormValues } from "../../interface/Interfaces";


const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Firstname must be between 3 and 25 characters")
    .max(50, "Firstname must be between 3 and 25 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Lastname must be between 3 and 25 characters")
    .max(50, "Lastname must be between 3 and 25 characters")
    .required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password should be like 'Test@1234', min 8 char."
    ),


});

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmitForm = async (Values: FormValues, { resetForm }: any) => {
    try {
      const data = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Values),
      });
      const formData = await data.json();
      if (formData) {
        navigate("/");
      }
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  return (
    <Container fluid className="form-body">
      <Row className="user-form">
        <Col className="col-md-6 form-size form-banner">
          <div className="form-banner">
            <img
              className="img-fluid form-image"
              src={formBanner}
              alt="loading"
            />
          </div>
        </Col>
        <Col className="col-md-4 form-size">
          <div className="main-form">
            <h1>Registration</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={signUpSchema}
              onSubmit={handleSubmitForm}
              validateOnChange
              validateOnBlur
            >
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldTouched,
              }) => (
                <Form className="signup-form">
                  <div className="form-field">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      id="firstName"
                      name="firstName"
                      placeholder=""
                      className={
                        errors.firstName && touched.firstName
                          ? "error-border"
                          : ""
                      }
                      onChange={(e: any) => {
                        handleChange(e);
                        setFieldTouched("firstName", true, false);
                      }}
                      onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName ? (
                      <div className="error-text">{errors.firstName}</div>
                    ) : null}
                  </div>

                  <div className="form-field">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      id="lastName"
                      name="lastName"
                      placeholder=""
                      onChange={(e: any) => {
                        handleChange(e);
                        setFieldTouched("lastName", true, false);
                      }}
                      onBlur={handleBlur}
                      className={
                        errors.lastName && touched.lastName
                          ? "error-border"
                          : ""
                      }
                    />
                    {errors.lastName && touched.lastName ? (
                      <div className="error-text">{errors.lastName}</div>
                    ) : null}
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <Field
                      id="email"
                      name="email"
                      placeholder=""
                      onChange={(e: any) => {
                        handleChange(e);
                        setFieldTouched("email", true, false);
                      }}
                      onBlur={handleBlur}
                      type="email"
                      className={
                        errors.email && touched.email ? "error-border" : ""
                      }
                    />
                    {errors.email && touched.email ? (
                      <div className="error-text">{errors.email}</div>
                    ) : null}
                  </div>

                  <div className="form-field">
                    <label htmlFor="pass">Password</label>
                    <Field
                      id="pass"
                      name="password"
                      autoComplete="new-password"
                      onChange={(e: any) => {
                        handleChange(e);
                        setFieldTouched("password", true, false);
                      }}
                      onBlur={handleBlur}
                      type="password"
                      placeholder=""
                      className={
                        errors.password && touched.password
                          ? "error-border"
                          : ""
                      }
                    />
                    {errors.password && touched.password ? (
                      <div className="error-text">{errors.password}</div>
                    ) : null}
                  </div>

                  <button type="submit" className="btn form-btn">
                    Submit
                  </button>

                  <div className="sign-up-link">
                    <p>
                      Already a member?
                      <span>
                        <Link to="/"> Login</Link>
                      </span>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
