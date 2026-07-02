"use client";
import React, { useState } from "react";
import EyeClose from "../../svg/EyeClose";
import EyeOpen from "../../svg/EyeOpen";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const [show, setShow] = useState(false);

    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}

        <div className="input-field">
          <input
            ref={ref}
            id={inputId}
            type={show ? "text" : "password"}
            className={`input with-icon-right ${error ? "input-error" : ""} ${className}`}
            {...props}
          />

          <span
            className="input-icon-btn"
            onClick={() => setShow((prev) => !prev)}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOpen /> : <EyeClose />}
          </span>
        </div>

        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
