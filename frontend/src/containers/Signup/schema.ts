import * as yup from "yup";

// Utils
import { getCharacterValidationError } from "@/utils/functions/getCharacterValidation";

// Types
import { UserRoleEnum } from "@/types/user";

const signupSchema = yup.object().shape({
  firstName: yup.string().required("Last name is required"),
  lastName: yup.string().required("First name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords does not match"),
  role: yup
    .string()
    .required("Role is required")
    .oneOf(Object.values(UserRoleEnum)),
});

export default signupSchema;
