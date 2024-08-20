"use client";
import React, { forwardRef } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";

interface InputFieldProps {
  label: string;
  error?: string;
  placeholder: string;
}
// 子コンポーネントで `ref` を受け取る
export const TextareaField = forwardRef<HTMLTextAreaElement, InputFieldProps>(
  ({ label, error, placeholder }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        <FormLabel>{label}</FormLabel>
        <Textarea ref={ref} placeholder={placeholder} />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  },
);
