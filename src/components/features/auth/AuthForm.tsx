"use client";
import { toast } from "sonner";
import { Button, Link } from "../../ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { findAnimation } from "../../../packages/utils/app.utils";
import InputFactory from "../../ui/inputs/react-hook-form/InputFactory";
import type { FieldErrors, Resolver, SubmitHandler } from "react-hook-form";
import { sanitizeFormData } from "../../../packages/utils/sanitizer.utils";
import type { InputFactoryProps } from "../../ui/inputs/react-hook-form/InputFactory";

import {
  DEFAULT_FORM_VALUES,
  type AnimationDirectionType,
} from "../../../packages/configs/app.config";

import {
  authFormConfig,
  authSchemaMap,
  type AuthSchemaKey,
  type FormInputType,
  type FormListType,
} from "../../../packages/forms/auth.form";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AuthFormProps {
  formKey: AuthSchemaKey;
  onSubmit?: (data: unknown) => void;
  isLoading?: boolean | undefined;
}

interface FormLayoutProps {
  form: FormListType;
  children: React.ReactNode;
  className?: string;
  animationDirection?: AnimationDirectionType;
}

interface FormFieldsProps {
  inputs: FormInputType[];
  // all unknown — cast at point of use inside InputFactory
  register: unknown;
  control: unknown;
  errors: FieldErrors<Record<string, unknown>>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const buildDefaultValues = (formKey: AuthSchemaKey): Record<string, unknown> => {
  const form = authFormConfig[formKey];
  const values: Record<string, unknown> = {};

  form.formInputs.forEach((field) => {
    const preset = DEFAULT_FORM_VALUES[field.id as keyof typeof DEFAULT_FORM_VALUES];
    values[field.id] = preset !== undefined ? preset : field.type === "checkbox" ? false : "";
  });

  return values;
};

// ─── useAuthForm ──────────────────────────────────────────────────────────────
const useAuthForm = (formKey: AuthSchemaKey) => {
  const schema = authSchemaMap[formKey];
  const defaultValues = buildDefaultValues(formKey);
  const resolver = zodResolver(schema as Parameters<typeof zodResolver>[0]) as unknown as Resolver<
    Record<string, unknown>
  >;

  return useForm<Record<string, unknown>>({
    resolver: resolver,
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    shouldUnregister: false,
  });
};

// ─── FormFields ───────────────────────────────────────────────────────────────
const FormFields = ({ inputs, register, control, errors }: FormFieldsProps) => {
  return (
    <>
      {inputs.map((input) => {
        const renderer = InputFactory[input.type as keyof typeof InputFactory];

        const rawError = errors[input.id];
        const errorMessage =
          rawError && typeof rawError === "object" && "message" in rawError
            ? String((rawError as { message: unknown }).message)
            : "";

        const props: unknown = {
          ...input,
          register: register as InputFactoryProps["register"],
          control: control as InputFactoryProps["control"],
          error: { message: errorMessage },
        };

        return (
          <div key={input.key} className="flex flex-col gap-2 p-1">
            {input.type !== "checkbox" && (
              <label htmlFor={input.id} className="text-sm font-medium">
                {input.label}
                {input.required && <span className="text-destructive ml-0.5">*</span>}
              </label>
            )}

            {renderer ? renderer(props as unknown as InputFactoryProps) : null}

            {errorMessage && input.type !== "checkbox" && (
              <span className="text-destructive text-xs">{errorMessage}</span>
            )}
          </div>
        );
      })}
    </>
  );
};

// ─── FormLayout ───────────────────────────────────────────────────────────────
const FormLayout = ({
  form,
  children,
  className,
  animationDirection = "right",
}: FormLayoutProps) => {
  const { referTo } = form;

  const animationName = findAnimation(animationDirection);

  return (
    <div
      style={{
        ...layoutCss.container,
        animationName: animationName,
      }}
      className={className}
    >
      <div style={layoutCss.card}>
        <header style={layoutCss.header}>
          <h1 style={layoutCss.title}>{form.title}</h1>

          {form.description && <p style={layoutCss.description}>{form.description}</p>}
        </header>

        <section style={layoutCss.content}>{children}</section>

        {referTo && (
          <footer style={layoutCss.footer}>
            <p style={layoutCss.footerText}>
              {referTo.label} <Link href={`/auth/${referTo.href}`}>{referTo.href}</Link>
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

// ─── AuthForm ─────────────────────────────────────────────────────────────────
const AuthForm = ({ formKey, onSubmit: externalSubmit, isLoading = false }: AuthFormProps) => {
  const form = authFormConfig[formKey];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useAuthForm(formKey);

  const onSubmit: SubmitHandler<Record<string, unknown>> = (data) => {
    if (externalSubmit) {
      externalSubmit(data);
    } else {
      const values = sanitizeFormData(data);
      console.log(`[${formKey}] submitted:`, values);
      console.log(`[${formKey}] errors:`, errors);

      setTimeout(() => {
        toast.success(`${formKey.toLocaleLowerCase()} submitted`);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormLayout form={form}>
        <FormFields
          inputs={form.formInputs}
          register={register}
          control={control}
          errors={errors}
        />

        {form.submit && (
          <Button type="submit" disabled={isSubmitting}>
            {isLoading ? form.submit.onSubmitLabel : form.submit.label}
          </Button>
        )}
      </FormLayout>
    </form>
  );
};

export default AuthForm;

// ─── Styling ─────────────────────────────────────────────────────────────────
const layoutCss = {
  container: {
    width: "100%",
    maxWidth: "48rem",
    marginInline: "auto",
    animationDuration: "500ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    animationFillMode: "both",
  } satisfies React.CSSProperties,

  card: {
    background: "hsl(var(--card))",
    color: "hsl(var(--card-foreground))",

    border: "1px solid hsl(var(--border))",
    borderRadius: "var(--radius)",

    overflow: "hidden",

    boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
  } satisfies React.CSSProperties,

  header: {
    padding: "1.25rem 1.5rem",
    borderBottom: "1px solid hsl(var(--border))",
  } satisfies React.CSSProperties,

  title: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: 1.3,
  } satisfies React.CSSProperties,

  description: {
    marginTop: "0.375rem",
    fontSize: "0.875rem",
    color: "hsl(var(--muted-foreground))",
    lineHeight: 1.5,
  } satisfies React.CSSProperties,

  content: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",

    padding: "1.5rem",
  } satisfies React.CSSProperties,

  footer: {
    padding: "1rem 1.5rem",
    borderTop: "1px solid hsl(var(--border))",
  } satisfies React.CSSProperties,

  footerText: {
    margin: 0,
    textAlign: "center",
    fontSize: "0.875rem",
    color: "hsl(var(--muted-foreground))",
  } satisfies React.CSSProperties,
};
