import type z from "zod";
import type { InputType } from "../../types/app";

import {
  signinSchema,
  signupSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from "../schemas/auth.schema";

//   TYPES
export interface FormInputType {
  key: string;
  id: string;
  label: string;
  type: InputType;
  required: boolean;
  placeholder: string;
  errorMessage?: string;
  options?: { label: string; value: string }[];
}

export interface ReferToType {
  href: string;
  label: string;
}

export interface SubmitType {
  label: string;
  onSubmitLabel: string;
}

export interface FormListType {
  key: string;
  title: string;
  description: string;
  icon?: string;
  submit?: SubmitType;
  referTo?: ReferToType;
  formInputs: FormInputType[];
}

// CONFIG (OBJECT MAP ✅)
export const authFormConfig: Record<string, FormListType> = {
  SIGNIN: {
    key: "SIGNIN",
    title: "Sign In",
    description: "Sign in to your account",
    icon: "User",
    submit: {
      label: "Sign In",
      onSubmitLabel: "Signing In...",
    },
    referTo: {
      href: "signup",
      label: "Don't have an account?",
    },
    formInputs: [
      {
        key: "SIGNIN-EMAIL",
        id: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "Enter your email",
        errorMessage: "Email is required",
      },
      {
        key: "SIGNIN-PASSWORD",
        id: "password",
        label: "Password",
        type: "password",
        required: true,
        placeholder: "Enter your password",
        errorMessage: "Password is required",
      },
      {
        key: "SIGNIN-REMEMBER",
        id: "rememberme",
        label: "Remember me",
        type: "checkbox",
        required: false,
        placeholder: "",
        errorMessage: "",
      },
    ],
  },

  SIGNUP: {
    key: "SIGNUP",
    title: "Create Account",
    description: "Sign up to get started",
    icon: "UserPlus",
    submit: {
      label: "Sign Up",
      onSubmitLabel: "Creating Account...",
    },
    referTo: {
      href: "signin",
      label: "Already have an account?",
    },
    formInputs: [
      {
        key: "SIGNUP-FULLNAME",
        id: "fullname",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter your fullname",
        errorMessage: "Full name is required",
      },
      {
        key: "SIGNUP-EMAIL",
        id: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "Enter your email",
        errorMessage: "Email is required",
      },
      {
        key: "SIGNUP-PASSWORD",
        id: "password",
        label: "Password",
        type: "password",
        required: true,
        placeholder: "Create a password",
        errorMessage: "Password is required",
      },
      {
        key: "SIGNUP-CONFIRM-PASSWORD",
        id: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        required: true,
        placeholder: "Confirm your password",
        errorMessage: "Please confirm your password",
      },
      {
        key: "SIGNUP-AGREE-TERMS",
        id: "agreeToTerms",
        label: "I agree to the terms and conditions",
        type: "checkbox",
        required: true,
        placeholder: "",
        errorMessage: "",
      },
    ],
  },

  FORGOT_PASSWORD: {
    key: "FORGOT_PASSWORD",
    title: "Forgot Password",
    description: "Enter your email to reset password",
    icon: "Key",
    submit: {
      label: "Send Reset Link",
      onSubmitLabel: "Sending...",
    },
    referTo: {
      href: "signin",
      label: "Back to login?",
    },
    formInputs: [
      {
        key: "FORGOT-EMAIL",
        id: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "Enter your email",
        errorMessage: "Email is required",
      },
    ],
  },

  RESET_PASSWORD: {
    key: "RESET_PASSWORD",
    title: "Reset Password",
    description: "Enter your new password",
    icon: "Lock",
    submit: {
      label: "Reset Password",
      onSubmitLabel: "Resetting...",
    },
    referTo: {
      href: "signin",
      label: "Back to login?",
    },
    formInputs: [
      {
        key: "RESET-PASSWORD",
        id: "password",
        label: "New Password",
        type: "password",
        required: true,
        placeholder: "Enter new password",
        errorMessage: "Password is required",
      },
      {
        key: "RESET-CONFIRM-PASSWORD",
        id: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        required: true,
        placeholder: "Confirm new password",
        errorMessage: "Please confirm password",
      },
    ],
  },

  UPDATE_PROFILE: {
    key: "UPDATE_PROFILE",
    title: "Update Profile",
    description: "Update your personal information",
    icon: "UserCog",
    submit: {
      label: "Update",
      onSubmitLabel: "Updating...",
    },
    referTo: {
      href: "signin",
      label: "Back to login?",
    },
    formInputs: [
      {
        key: "UPDATE-FULLNAME",
        id: "fullname",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter your fullname",
        errorMessage: "Name is required",
      },
      {
        key: "UPDATE-EMAIL",
        id: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "Enter your email",
        errorMessage: "Email is required",
      },
      {
        key: "UPDATE-PHONE",
        id: "phone",
        label: "Phone Number",
        type: "text",
        required: false,
        placeholder: "Enter phone number",
        errorMessage: "",
      },
    ],
  },
};

//  TYPESAFE KEY
export type AuthFormKey = keyof typeof authFormConfig;

export const authSchemaMap = {
  SIGNIN: signinSchema,
  SIGNUP: signupSchema,
  FORGOT_PASSWORD: forgetPasswordSchema,
  RESET_PASSWORD: resetPasswordSchema,
  UPDATE_PROFILE: updateProfileSchema,
} as const;

export type AuthSchemaMap = typeof authSchemaMap;

export type AuthSchemaKey = keyof AuthSchemaMap;

export type AuthSchemaType<K extends AuthSchemaKey> = z.infer<AuthSchemaMap[K]>;
