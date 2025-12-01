import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

interface SelectSearchProps {
  options: string[] | { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  clearable?: boolean;
  className?: string;
  disabled?: boolean;
  noResultsMessage?: string;
}

export function SelectSearch({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  clearable = false,
  className,
  disabled = false,
  noResultsMessage = "No results found",
}: SelectSearchProps) {
  const [open, setOpen] = useState(false);

  // FIX: Explicitly typed normalizedOptions to ensure it's always an array of objects
  const normalizedOptions: { value: string; label: string }[] = 
    Array.isArray(options) && options.length > 0 && typeof options[0] === 'string'
      ? (options as string[]).map(opt => ({ value: opt, label: opt }))
      : (options as { value: string; label: string }[]);

  const selectedOption = normalizedOptions.find(option => option.value === value);

  const handleSelect = (currentValue: string) => {
    if (clearable && currentValue === value) {
      onChange("");
    } else {
      onChange(currentValue);
    }
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={disabled}
        >
          <div className="flex items-center justify-between w-full">
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <div className="flex items-center">
              {clearable && value && (
                <X 
                  className="h-4 w-4 opacity-50 hover:opacity-100 mr-1"
                  onClick={handleClear}
                />
              )}
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput 
            placeholder={`Search ${label || "options"}...`}
            className="flex-1 caret-black dark:caret-white"
            autoFocus
          />
          <CommandList>
            <CommandEmpty>{noResultsMessage}</CommandEmpty>
            <CommandGroup>
              {normalizedOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                >
                  <span>{option.label}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
