"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function MultiSelect<T extends string>({
  values,
  options,
  setValues,
}: {
  options: T[];
  values: NoInfer<T>[];
  setValues: React.Dispatch<React.SetStateAction<NoInfer<T>[]>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-fit w-[200px] justify-between text-wrap"
        >
          {values.length > 0 ? values.join(", ") : "Select Currency..."}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] overflow-auto p-0">
        <Command>
          <CommandInput placeholder="Search currency..." />
          <CommandEmpty>No currency found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={() => {
                  setValues((prev) =>
                    prev.includes(option)
                      ? prev.filter((v) => v !== option)
                      : [...prev, option],
                  );
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    values.includes(option) ? "opacity-100" : "opacity-0",
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
