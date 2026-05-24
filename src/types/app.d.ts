// Extended image metadata for logos, icons, etc.
export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  id: string; // required unique identifier
  src: string; // required image source
  alt: string; // required alt text
  href?: string; // optional link wrapper
  width?: number; // optional width
  height?: number; // optional height
  color?: string; // optional color metadata
  className?: string; // optional className override
  loading?: "lazy" | "eager"; // optional loading strategy
}
export type InputType =
  | "text"
  | "textarea"
  | "email"
  | "password"
  | "number"
  | "decimal"
  | "date"
  | "tel"
  | "url"
  | "select"
  | "multiselect"
  | "radio"
  | "checkbox"
  | "file"
  | "range"
  | "color";

// Theme Mode
export type ThemeMode = "light" | "dark" | "system";

export type ResolvedThemeMode = Exclude<ThemeMode, "system">;
