import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, error, required, id, ...rest }, ref) => (
    <div className={twMerge("flex flex-col", error && "text-red-600")}>
      <label className="text-bold" htmlFor={id}>
        {label}: {required && <span aria-label="required">*</span>}
      </label>
      <input
        ref={ref}
        aria-invalid={Boolean(error)}
        className={twMerge("rounded text-black", error && "border-red-600")}
        id={id}
        type="text"
        name={name}
        required={required}
        {...rest}
      />
      {error && <span className="text-sm">{error}</span>}
    </div>
  )
);

Input.displayName = "Input";
