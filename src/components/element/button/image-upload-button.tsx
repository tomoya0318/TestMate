"use client";
import React, { useRef, useState } from "react";
import { Button, Input, VStack, Image } from "@chakra-ui/react";

type ImageUploadButtonProps = {
  label: string;
  onUpload: (url: string) => void;
};

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  label,
  onUpload,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setPreviewUrl(url);
        onUpload(url);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <VStack>
      <Button onClick={() => inputRef.current?.click()}>{label}</Button>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </VStack>
  );
};
