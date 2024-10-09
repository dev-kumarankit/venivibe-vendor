// CountrySelect.js
"use client";

import React from "react";
import { Label, Select } from "flowbite-react";

interface singleSelect {
  label?: string;
  options?: any;
  id?: string;
  required?: boolean;
  placeholder?: string;
  value?: any;
  defaultValue?: any;
  onChange?: (value: string) => void;
}

export const SingleSelect: React.FC<singleSelect> = ({
  label,
  options,
  id,
  required,
  placeholder,
  value,
  onChange,
  defaultValue,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value); // Pass the selected value to the parent component
    }
  };
  return (
    <div>
      <div>
        <Label htmlFor={id} value={label} />
      </div>
      <Select
        id={id}
        value={value}
        required={required}
        defaultValue={defaultValue}
        onChange={handleChange}
        className="[&>div>select]:bg-[#F8F8F8] [&>div>select]:border-0 [&>div>select]:min-h-[52px] [&>div>select]:text-gray focusShadow"
      >
        <option className="text-gray" disabled selected value="">
          {placeholder}
        </option>
        {options?.map((option: any, index: any) => (
          <option className="text-gray" key={index} value={option?.id}>
            {option?.dial_code ? option?.dial_code : option?.name}
          </option>
        ))}
      </Select>
    </div>
  );
};
