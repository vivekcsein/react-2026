import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <label htmlFor={inputId} className="checkbox-wrapper relative">
        <input ref={ref} id={inputId} type="checkbox" className=" checkbox-input" {...props} />

        <div className="checkbox-box">
          <svg viewBox="0 0 24 24" className="checkbox-check">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {label && <span className="checkbox-label">{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
