import React, { useState, useRef, useLayoutEffect } from "react";
import { Check, ChevronsUpDown, ListFilter, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * Base interface for option items in the multi-select combobox
 */
export interface BaseOption {
  label: string;
  value: string;
}

type OptionType = BaseOption | string;

interface Props<T extends OptionType> {
  label: string;
  renderItem: (option: T) => React.ReactNode;
  renderSelectedItem: (value: string[]) => React.ReactNode;
  options: T[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export const MultiSelectCombobox = <T extends OptionType>({
  label,
  renderItem,
  renderSelectedItem,
  options,
  value,
  onChange,
  className,
}: Props<T>) => {
  const [open, setOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  const handleChange = (currentValue: string) => {
    onChange(
      value.includes(currentValue)
        ? value.filter((val) => val !== currentValue)
        : [...value, currentValue]
    );
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setOpen(!open);
            }
          }}
        >
          <div className="flex items-center gap-1 flex-1">
            {value.length > 0 && (
              <ListFilter className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="truncate">
              {value.length > 0
                ? renderSelectedItem(value)
                : `Select ${label}...`}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {value.length > 0 && (
              <X
                className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={handleClear}
              />
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="p-0" 
        style={{ width: triggerWidth > 0 ? `${triggerWidth}px` : 'auto' }}
        align="start"
      >
        <Command>
          <CommandInput placeholder={`Search ${label}...`} />
          <CommandList>
            <CommandEmpty>No {label} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const opt: BaseOption =
                  typeof option === "string"
                    ? { value: option, label: option }
                    : option;

                return (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={() => handleChange(opt.value)}
                    aria-selected={value.includes(opt.value)}
                    style={{ width: "100%" }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(opt.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {renderItem(option as T)}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
