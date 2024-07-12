"use client";
import React from "react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { addPost } from "@/api/add-post";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";

const FormPost: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!userId) {
      toast({
        title: "ユーザーが認証されていません",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newErrors: { title?: string; description?: string } = {};
    if (!title) newErrors.title = "タイトルは必須です";
    if (!description) newErrors.description = "説明は必須です";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await addPost({ title, description, userId });
      toast({
        title: "投稿に成功しました",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        title: "投稿に失敗しました",
        description: String(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={!!errors.title}>
        <FormLabel>タイトル</FormLabel>
        <Input ref={titleRef} type="text" />
        {errors.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
      </FormControl>
      <FormControl isInvalid={!!errors.description} mt={4}>
        <FormLabel>説明</FormLabel>
        <Textarea ref={descriptionRef} />
        {errors.description && (
          <FormErrorMessage>{errors.description}</FormErrorMessage>
        )}
      </FormControl>
      <Button type="submit" mt={4}>
        投稿
      </Button>
    </form>
  );
};

export default FormPost;
