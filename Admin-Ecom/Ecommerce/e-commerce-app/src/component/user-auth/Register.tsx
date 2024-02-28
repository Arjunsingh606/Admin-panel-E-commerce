import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import formBanner from "../../assets/form-banner-1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  RegisterFields,
  initialValues,
  signUpSchema,
} from "../../interface/InterfaceAuth";
import "../../styles/auth.css";


const Register: React.FC = () => {
  // const [admin, setAdmin] = useState<RegisterFields[]>([]);
  const [userUuid, setUserUuid] = useState<string>("")
  const navigate = useNavigate();

  // const getUsersData = async () => {
  //   const response = await fetch("http://localhost:4000/admin");
  //   const getUsers = await response.json();
  //   setAdmin(getUsers);
  // };

  // console.log(admin, "dekhte h kya h admin")

  let getUuid: any = crypto.randomUUID()
  useEffect(() => {
    // getUsersData();
    setUserUuid(getUuid)
  }, []);



  const handleSubmitForm = async (
    Values: RegisterFields,
    { resetForm }: any
  ) => {
    try {
      const data = await fetch("http://localhost:4000/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...Values, uuid: userUuid }),
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
        <Col className="col-md-6 form-size">
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

