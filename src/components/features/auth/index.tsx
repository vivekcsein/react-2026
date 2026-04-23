import { AuthForm } from "./auth-form";

export const Signin = () => {
  return <AuthForm formKey="SIGNIN" />;
};

export const Signup = () => {
  return <AuthForm formKey="SIGNUP" />;
};

export const ForgetPassword = () => {
  return <AuthForm formKey="FORGOT_PASSWORD" />;
};

export const ResetPassword = () => {
  return <AuthForm formKey="RESET_PASSWORD" />;
};

export const UpdateProfile = () => {
  return <AuthForm formKey="UPDATE_PROFILE" />;
};
