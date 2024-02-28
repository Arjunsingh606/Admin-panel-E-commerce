import { Formik, Field, Form } from "formik";
import formBanner from "../../assets/form-banner-1.jpg";
import "../../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  LoginFields,
  loginValue,
  loginSchema,
} from "../../interface/InterfaceAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  let apiError: any;
  const handleSubmit = async (Values: LoginFields) => {
    try {
      const response = await fetch("http://localhost:4000/customer");
      const users = await response.json();
      const loggedInUser = users.find(
        (users: LoginFields) =>
          users.email === Values.email && users.password === Values.password
      );
      if (loggedInUser) {
        sessionStorage.setItem("loginUser", JSON.stringify(loggedInUser));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error, "error while fetching data")
    }
  };


  return (
    <Container fluid>
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
        <Col className="col-md-6 ">
          <div className="form-size">
            <div className="main-form">
              <h1>Login</h1>
              <Formik
                initialValues={loginValue}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {({
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldTouched,
                }) => (
                  <Form className="signup-form">
                    {apiError ? "" : ""}
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
                      <label htmlFor="password">Password</label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e: any) => {
                          handleChange(e);
                          setFieldTouched("password", true, false);
                        }}
                        onBlur={handleBlur}
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
                      Login
                    </button>
                    <div className="sign-up-link">
                      <p>
                        Not a member?
                        <span>
                          <Link to="/register">Registration</Link>
                        </span>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;