"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const countryData: Record<string, { code: string; mask: string; placeholder: string; maxDigits: number }> = {
  RU: { code: "+7", mask: "(999) 999-99-99", placeholder: "(999) 999-99-99", maxDigits: 10 },
  BY: { code: "+375", mask: "(99) 999-99-99", placeholder: "(99) 999-99-99", maxDigits: 9 },
  KZ: { code: "+7", mask: "(999) 999-99-99", placeholder: "(999) 999-99-99", maxDigits: 10 },
  US: { code: "+1", mask: "(999) 999-9999", placeholder: "(999) 999-9999", maxDigits: 10 },
};

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  country?: keyof typeof countryData;
  onCountryChange?: (country: keyof typeof countryData) => void;
  inputClassName?: string;
}

export function PhoneInput({
  value,
  onChange,
  country = "RU",
  onCountryChange,
  className,
  inputClassName,
  ...props
}: PhoneInputProps) {
  const [internalCountry, setInternalCountry] = React.useState<keyof typeof countryData>(country);
  const [inputValue, setInputValue] = React.useState("");

  // When country changes, clear the input
  const handleCountryChange = (newCountry: keyof typeof countryData) => {
    setInternalCountry(newCountry);
    onCountryChange?.(newCountry);
    setInputValue("");
    onChange("");
  };

  // Format the raw digits according to the country mask (without country code)
  const formatInput = (raw: string): string => {
    const digits = raw.replace(/\D/g, "").slice(0, countryData[internalCountry].maxDigits);
    const mask = countryData[internalCountry].mask.replace(/\D/g, "");
    let formatted = "";
    let digitIndex = 0;
    for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
      if (mask[i] === "9") {
        formatted += digits[digitIndex++];
      } else {
        formatted += mask[i];
      }
    }
    return formatted;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatInput(raw);
    setInputValue(formatted);

    // Extract digits (without country code) and send full E.164 to parent
    const digits = formatted.replace(/\D/g, "");
    const e164Value = digits ? `${countryData[internalCountry].code}${digits}` : "";
    onChange(e164Value);
  };

  // Sync external value to display (for clearing, etc.)
  React.useEffect(() => {
    if (!value) {
      setInputValue("");
      return;
    }
    // If the external value has changed, extract the local digits and reformat
    const digits = value.replace(/\D/g, "").replace(countryData[internalCountry].code.replace(/\D/g, ""), "");
    const currentDigits = inputValue.replace(/\D/g, "");
    if (digits !== currentDigits) {
      const formatted = formatInput(digits);
      setInputValue(formatted);
    }
  }, [value, inputValue, internalCountry]);

  return (
    <div className={cn("flex gap-2", className)}>
      <Select value={internalCountry} onValueChange={handleCountryChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="RU" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="RU">RU</SelectItem>
          <SelectItem value="BY">BY</SelectItem>
          <SelectItem value="KZ">KZ</SelectItem>
          <SelectItem value="US">US</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="tel"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={countryData[internalCountry].placeholder}
        className={cn("flex-1", inputClassName)}
        {...props}
      />
    </div>
  );
}
