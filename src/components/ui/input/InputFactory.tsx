import Checkbox from "./Checkbox";
import Input from "./Input";
import PasswordInput from "./PasswordInput";

export type BaseInputProps = {
  id: string;
  type: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
};

export const InputFactory: Record<string, <T extends BaseInputProps>(input: T) => React.ReactNode> =
  {
    text: (input) => (
      <Input id={input.id} type="text" placeholder={input.placeholder} required={input.required} />
    ),

    email: (input) => (
      <Input id={input.id} type="email" placeholder={input.placeholder} required={input.required} />
    ),

    password: (input) => (
      <PasswordInput id={input.id} placeholder={input.placeholder} required={input.required} />
    ),

    checkbox: (input) => (
      <Checkbox type="checkbox" placeholder={input.placeholder} required={input.required} />
    ),

    select: (input) => (
      <select id={input.id} required={input.required}>
        <option value="">Select...</option>
        {input.options?.map((opt: { label: string; value: string }) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    ),
  };
