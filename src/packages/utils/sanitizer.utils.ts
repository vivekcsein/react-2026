import { FORM_FIELD_LENGTHS } from "../configs/app.config";

const MAX_PASSWORD_LENGTH = FORM_FIELD_LENGTHS.password;

export function sanitizeFormData<T extends Record<string, unknown>>(
  data: T,
): Omit<T, "confirmPassword"> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirmPassword: _confirmPassword, password, ...rest } = data;

  return {
    ...rest,
    password:
      typeof password === "string" ? password.trim().slice(0, MAX_PASSWORD_LENGTH) : password,
  } as Omit<T, "confirmPassword">;
}
