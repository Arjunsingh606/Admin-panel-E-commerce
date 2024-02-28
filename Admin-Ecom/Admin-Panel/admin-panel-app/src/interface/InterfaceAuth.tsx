import * as Yup from "yup";

export interface RegisterFields {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  id?:string;
  uuid?:string
}

export const initialValues: RegisterFields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  id:"",
};

export const signUpSchema = Yup.object().shape({
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

export interface LoginFields{
  email?:string;
  password?:string;
}

export const loginValue: LoginFields = {
  email: "",
  password: "",
};

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password should be like 'Test@1234', min 8 char."
    ),
});