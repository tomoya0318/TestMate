"use client";
import React, { useRef, useState } from "react";
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
import { ImageUploadButton } from "@/components/element/button/image-upload-button";

const FormPost: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const titleRef = useRef<HTMLInputElement | null>(null);
  const shortRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const googleGroupUrlRef = useRef<HTMLInputElement | null>(null);
  const storeUrlRef = useRef<HTMLInputElement | null>(null);

  const [iconUrl, setIconUrl] = useState<string>("");
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    title?: string;
    short?: string;
    description?: string;
    iconUrl?: string;
    screenshots?: string;
    googleGroupUrl?: string;
    storeUrl?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value || "";
    const short = shortRef.current?.value || "";
    const description = descriptionRef.current?.value || "";
    const googleGroupUrl = googleGroupUrlRef.current?.value || "";
    const storeUrl = storeUrlRef.current?.value || "";

    if (!userId) {
      toast({
        title: "ユーザーが認証されていません",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newErrors: {
      title?: string;
      short?: string;
      description?: string;
      iconUrl?: string;
      screenshots?: string;
      googleGroupUrl?: string;
      storeUrl?: string;
    } = {};
    if (!title) newErrors.title = "タイトルは必須です";
    if (!short) newErrors.short = "簡単な説明は必須です";
    if (!description) newErrors.description = "詳細は必須です";
    if (!iconUrl) newErrors.iconUrl = "アイコンURLは必須です";
    if (screenshots.length === 0) newErrors.screenshots = "スクリーンショットは必須です";
    if (!googleGroupUrl) newErrors.googleGroupUrl = "GoogleグループURLは必須です";
    if (!storeUrl) newErrors.storeUrl = "ストアURLは必須です";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await addPost({
        title,
        short,
        description,
        iconUrl,
        screenshots,
        groupUrl: googleGroupUrl,
        storeUrl,
        userId,
      });
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
      <FormControl isInvalid={!!errors.short} mt={4}>
        <FormLabel>簡単な説明</FormLabel>
        <Textarea ref={shortRef} />
        {errors.short && (
          <FormErrorMessage>{errors.short}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.description} mt={4}>
        <FormLabel>詳細</FormLabel>
        <Textarea ref={descriptionRef} />
        {errors.description && (
          <FormErrorMessage>{errors.description}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.iconUrl} mt={4}>
        <FormLabel>アイコンURL</FormLabel>
        <ImageUploadButton label="アイコンをアップロード" onUpload={(url) => setIconUrl(url || "")} />
        {errors.iconUrl && <FormErrorMessage>{errors.iconUrl}</FormErrorMessage>}
      </FormControl>
      <FormControl isInvalid={!!errors.screenshots} mt={4}>
        <FormLabel>スクリーンショット</FormLabel>
        <ImageUploadButton label="スクリーンショットをアップロード" onUpload={(url) => setScreenshots([...screenshots, url])} />
        {errors.screenshots && (
          <FormErrorMessage>{errors.screenshots}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.googleGroupUrl} mt={4}>
        <FormLabel>GoogleグループURL</FormLabel>
        <Input ref={googleGroupUrlRef} type="text" />
        {errors.googleGroupUrl && (
          <FormErrorMessage>{errors.googleGroupUrl}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.storeUrl} mt={4}>
        <FormLabel>ストアURL</FormLabel>
        <Input ref={storeUrlRef} type="text" />
        {errors.storeUrl && <FormErrorMessage>{errors.storeUrl}</FormErrorMessage>}
      </FormControl>
      <Button type="submit" mt={4}>
        投稿
      </Button>
    </form>
  );
};

export default FormPost;
