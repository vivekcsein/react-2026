import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`button ${className}`}
        {...props} // ✅ all native props (type, disabled, etc.)
      >
        {label ?? children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
