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
} & InputHTMLAttributes<HTMLSelectElement>) => {
  const [selected, setSelected] = useState<Set<T>>(new Set());

  const toggle = (value: T) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  const isSelected = (value: T) => selected.has(value);

  return (
    <div>
      {options.map((item) => (
        <div key={item} onClick={() => toggle(item)}>
          {item}
          {isSelected(item) && "✔"}
        </div>
      ))}
      <select id={id} name={name} multiple hidden>
        {Array.from(selected).map((item) => (
          <option key={item} value={item} selected>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
