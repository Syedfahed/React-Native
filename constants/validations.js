// import * as Yup from 'yup';
import { number, object, string } from "yup";
export const LoginValidation = object().shape({
  email: string().required("Email is required").email("Invalid email"),
  password: string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
});
export const SignUpValidation = object().shape({
  email: string().required("Email is required").email("Invalid email"),
  username: string().required("Username is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
  phoneNumber: number().max(10,'Max 10 Digit').min(12,'Min 12 Digit').required('Phone number is required').nullable('Only number required')
});
export const CreateBlogValidation = object().shape({
  title: string().required("Title is required"),
  description: string().required("Description is required"),
});
