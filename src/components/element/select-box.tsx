import { Select } from "@chakra-ui/react";
import React from "react";

interface SelectBoxProps {
  placeholder: string;
  setState: (state: string) => void;
  selects: string[];
}

export const SelectBox: React.FC<SelectBoxProps> = ({
  placeholder,
  setState,
  selects
}) => {
  return (
    <Select
      placeholder={placeholder}
      onChange={(e) => setState(e.target.value)}
      bg="white"
      size="lg"
    >
      {selects.map((select) => (
        <option key={select} value={select}>
          {select}
        </option>
      ))}
    </Select>
  );
};