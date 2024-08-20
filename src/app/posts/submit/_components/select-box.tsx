import React from "react";
import {
  FormControl,
  FormLabel,
  Stack,
  Checkbox,
  FormErrorMessage,
} from "@chakra-ui/react";
interface CheckBoxProps {
  label: string;
  error?: string;
  state: string;
  setState: (state: string) => void;
  selects: string[];
}
export const SelectBox: React.FC<CheckBoxProps> = ({
  label,
  error,
  state,
  setState,
  selects,
}) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Stack direction="row">
        {selects.map((select) => (
          <Checkbox
            key={select}
            isChecked={state === select}
            onChange={(e) => setState(e.target.checked ? select : "")}
          >
            {select}
          </Checkbox>
        ))}
      </Stack>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
