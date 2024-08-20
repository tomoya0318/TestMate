"use client";
import React, { forwardRef } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

interface InputFieldProps {
  label: string;
  error?: string;
  placeholder: string;
}
// 子コンポーネントで `ref` を受け取る
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, placeholder }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        <FormLabel>{label}</FormLabel>
        <Input ref={ref} type="text" placeholder={placeholder} />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  },
);
