import "../../../../styles/input.css";
import type { Control, UseFormRegister } from "react-hook-form";

import Input from "./Input";
import Select from "./Select";
import Checkbox from "./CheckBox";
import PasswordInput from "../PasswordInput";

export interface InputFactoryProps extends HTMLInputElement {
  label: string;
  options?: { label: string; value: string }[];
  // typed as unknown so callers don't need generics; cast internally
  register: UseFormRegister<Record<string, unknown>>;
  control: Control<Record<string, unknown>>;
  error?: { message: string };
}

// ─── Factory ──────────────────────────────────────────────────────────────────
const InputFactory: Record<string, (props: InputFactoryProps) => React.ReactNode> = {
  text: (props: InputFactoryProps) => (
    <Input id={props.id} placeholder={props.placeholder} {...props.register(props.id)} />
  ),

  email: (props: InputFactoryProps) => (
    <Input
      type="email"
      id={props.id}
      placeholder={props.placeholder}
      {...props.register(props.id)}
    />
  ),

  password: (props: InputFactoryProps) => (
    <PasswordInput id={props.id} placeholder={props.placeholder} {...props.register(props.id)} />
  ),

  checkbox: (props: InputFactoryProps) => (
    <Checkbox
      id={props.id}
      label={props.label}
      error={props.error?.message}
      {...props.register(props.id)}
    />
  ),

  select: (props: InputFactoryProps) => (
    <Select
      id={props.id}
      label={props.label}
      options={props.options ?? []}
      required={props.required}
      register={props.register}
      errorMessage={props.error?.message}
    />
  ),
};

export default InputFactory;
