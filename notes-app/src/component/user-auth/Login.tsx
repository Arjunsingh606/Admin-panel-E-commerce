import { Formik, Field, Form } from "formik";
import formBanner from "../../banner/form-banner-1.jpg";
import "../../styles/form.css";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { LoginFormValues } from "../../interface/Interfaces";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password should be like 'Test@1234', min 8 char."
    ),
});

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (Values: LoginFormValues) => {
    try {
      const response = await fetch("http://localhost:3001/users");
      const users = await response.json();
      const loggedInUser = users.find(
        (users: LoginFormValues) =>
          users.email === Values.email && users.password === Values.password
      );
      if (loggedInUser) {
        sessionStorage.setItem("loginUser", JSON.stringify(loggedInUser));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
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
        <Col className="col-md-4 form-size">
          <div className="main-form">
            <h1>Login</h1>
            <Formik
              initialValues={initialValues}
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
                        <Link to="/register"> Registration</Link>
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

export default Login;
