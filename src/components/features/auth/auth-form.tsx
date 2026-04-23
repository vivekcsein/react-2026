import Link from "../../ui/Link";
import { InputFactory } from "../../ui/input/InputFactory";
import { authFormConfig } from "../../../packages/forms/form.auth";
import type { FormListType, FormInputType, AuthFormKey } from "../../../packages/forms/form.auth";

interface FormLayoutProps {
  form: FormListType;
  children: React.ReactNode;
  className?: string;
}

export const FormLayout = ({ form, children, className }: FormLayoutProps) => {
  const referTo = form.referTo;

  return (
    <div className="container-sm">
      <div className="card">
        {/* HEADER */}
        <div className="header-nav">
          <h2 className="w-full header-title text-center">{form.title}</h2>
        </div>

        {/* DESCRIPTION */}
        <div className="app-description text-center">{form.description}</div>

        {/* CONTENT */}
        <div className={`app-content ${className}`}>{children}</div>

        {/* FOOTER */}
        {referTo && (
          <div className="footer border-0">
            <p className="text-sm text-muted-foreground">
              {referTo.label}{" "}
              <Link
                href={`/auth/${referTo.href}`}
                className="text-sm text-destructive underline hover:scale-105"
              >
                {referTo.href}
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface FormFieldsProps {
  inputs: FormInputType[];
}

export const FormFields = ({ inputs }: FormFieldsProps) => {
  return (
    <>
      {inputs.map((input) => {
        const render = InputFactory[input.type];

        return (
          <div key={input.key} className="flex flex-col gap-2 p-1">
            {/* Skip label for checkbox (handled inside) */}
            {input.type !== "checkbox" && <label htmlFor={input.id}>{input.label}</label>}

            {/* Fallback safety */}
            {render ? (
              render(input)
            ) : (
              <p className="text-red-500">Unsupported input type: {input.type}</p>
            )}
          </div>
        );
      })}
    </>
  );
};

interface AuthFormProps {
  formKey: AuthFormKey;
}

export const AuthForm = ({ formKey }: AuthFormProps) => {
  const form = authFormConfig[formKey];

  return (
    <form>
      <FormLayout form={form}>
        <FormFields inputs={form.formInputs} />

        {/* SUBMIT BUTTON */}
        {form.submit && <button className="submit-button w-full m-2">{form.submit.label}</button>}
      </FormLayout>
    </form>
  );
};
