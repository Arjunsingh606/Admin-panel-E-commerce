import * as React from "react";
import { Formik, Field, Form} from "formik";
import formBanner from "../../banner/form-banner-1.jpg";
import "../../styles/form.css";
import * as Yup from "yup";
import { Link } from "react-router-dom";

interface FormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
}

const SignupSchema = Yup.object().shape({
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
  role: Yup.string().required("Please select role"),
});

const Registeration: React.FC = () => {
  const HandleSubmitForm = async (Values: FormValues, { resetForm }: any) => {
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
        alert("You have successfully registered ! You can login now");
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
    role: "",
  };
  return (
    <div className="container-fluid form-body">
      <div className="row user-form">
        <div className="col-md-6 form-size form-banner">
          <div className="form-banner">
            <img
              className="img-fluid form-image"
              src={formBanner}
              alt="loading"
            />
          </div>
        </div>
        <div className="col-md-4 form-size">
          <div className="main-form">
            <h1>Signup Form</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={SignupSchema}
              onSubmit={HandleSubmitForm}
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
                    {errors.firstName && touched.firstName ? ( <div className="error-text">{errors.firstName}</div>  ) : null}
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

                  <div className="form-field">
                    <label htmlFor="role">Role</label>
                    <Field
                      name="role"
                      as="select"
                      onChange={(e: any) => {
                        handleChange(e);
                        setFieldTouched("role", true, false);
                      }}
                      onBlur={handleBlur}
                      className={
                        errors.role && touched.role ? "error-border" : ""
                      }
                    >
                      <option value="">Select role</option>
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </Field>
                    {errors.role && touched.role ? (
                      <div className="error-text">{errors.role}</div>
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
        </div>
      </div>
    </div>
  );
};

export default Registeration;
