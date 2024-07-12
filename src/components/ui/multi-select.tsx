"use client";

import {
  type HTMLAttributes,
  type HtmlHTMLAttributes,
  type InputHTMLAttributes,
  useState,
} from "react";

export const MultiSelect = <T extends string>({
  options,
  id,
  name,
  defaultValues,
  ...rest
}: {
  options: T[];
  defaultValues: T[];
} & InputHTMLAttributes<HTMLInputElement>) => {
  const [selected, setSelected] = useState<Set<T>>(new Set(defaultValues));

  const toggle = (value: T) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            id={option}
            name={name}
            value={option}
            checked={selected.has(option)}
            onChange={() => toggle(option)}
            {...rest}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};
