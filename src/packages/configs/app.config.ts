// configs for the app

export const usersLink = "https://jsonplaceholder.typicode.com/users";

// ─── Forms Field lengths ────────────────────────────────────────────────────────────────────
export const FORM_FIELD_LENGTHS = {
  fullname: 32,
  email: 32,
  password: 32,
  confirmPassword: 32,
} as const;

export type FormFieldLengthsType = (typeof FORM_FIELD_LENGTHS)[keyof typeof FORM_FIELD_LENGTHS];

// ─── Default Values ────────────────────────────────────────────────────────────────────
export const DEFAULT_FORM_VALUES = {
  fullname: "John Doe",
  email: "johndoe@gmail.com",
  password: "JohnDoe#123",
  confirmPassword: "JohnDoe#123",
  remember: false,
  agreeToTerms: false,
} satisfies Record<string, string | boolean>;

export type FormValuesType = typeof DEFAULT_FORM_VALUES;

// ─── Animation Direction ───────────────────────────────────────────────────────────────
export const ANIMATION_DIRECTION = {
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  BOTTOM: "bottom",
  NONE: "none",
} as const;

export type AnimationDirectionType = (typeof ANIMATION_DIRECTION)[keyof typeof ANIMATION_DIRECTION];

export const ANIMATION_NAMES = {
  left: "slideInLeft",
  right: "slideInRight",
  top: "slideInTop",
  bottom: "slideInBottom",
} as const;

export type AnimationNameType = (typeof ANIMATION_NAMES)[keyof typeof ANIMATION_NAMES];
