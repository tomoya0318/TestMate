"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { addPost } from "@/api/add-post";
import { addTag } from "@/api/add-tag";
import { app_type, categories, public_status } from "@/constants/app-config";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  useToast,
  Image,
  Select,
  HStack,
  VStack,
  Checkbox,
  Stack,
  Container,
  Center,
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
  const groupUrlRef = useRef<HTMLInputElement | null>(null);
  const storeUrlRef = useRef<HTMLInputElement | null>(null);

  const [iconUrl, setIconUrl] = useState<string>("");
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [appType, setAppType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [errors, setErrors] = useState<{
    title?: string;
    short?: string;
    description?: string;
    iconUrl?: string;
    screenshots?: string;
    appType?: string;
    category?: string;
    status?: string;
    groupUrl?: string;
    storeUrl?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value || "";
    const short = shortRef.current?.value || "";
    const description = descriptionRef.current?.value || "";
    const groupUrl = groupUrlRef.current?.value || "";
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
      appType?: string;
      category?: string;
      status?: string;
      groupUrl?: string;
      storeUrl?: string;
    } = {};
    if (!title) newErrors.title = "タイトルは必須です";
    if (!short) newErrors.short = "簡単な説明は必須です";
    if (!description) newErrors.description = "詳細は必須です";
    if (!iconUrl) newErrors.iconUrl = "アイコンURLは必須です";
    if (screenshots.length === 0)
      newErrors.screenshots = "スクリーンショットは必須です";
    if (!appType) newErrors.appType = "アプリ種別は必須です";
    if (!category) newErrors.category = "カテゴリは必須です";
    if (!status) newErrors.status = "公開状況は必須です";
    if (!groupUrl) newErrors.groupUrl = "GoogleグループURLは必須です";
    if (!storeUrl) newErrors.storeUrl = "ストアURLは必須です";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const postResponse = await addPost({
        title,
        short,
        description,
        iconUrl,
        screenshots,
        groupUrl,
        storeUrl,
        userId,
      });
      console.log("Post response:", postResponse);
      await addTag({
        appType,
        category,
        status,
        postId: postResponse.id, // 投稿IDを取得してタグに使用
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
      console.error("Error during post submission:", error);
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
      <Center>
      <Container maxW="container.sm" m={10}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>アプリ名</FormLabel>
            <Input ref={titleRef} type="text" placeholder="アプリ名" />
            {errors.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.short}>
            <FormLabel>簡単な説明</FormLabel>
            <Textarea ref={shortRef} placeholder="簡単な説明" />
            {errors.short && <FormErrorMessage>{errors.short}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.description}>
            <FormLabel>詳細</FormLabel>
            <Textarea ref={descriptionRef} placeholder="詳しい説明" />
            {errors.description && (
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.iconUrl}>
            <FormLabel>アプリのアイコン</FormLabel>
            <ImageUploadButton
              label="ファイルを選択"
              onUpload={(url) => setIconUrl(url || "")}
            />
            {iconUrl && <Image src={iconUrl} boxSize="80px" />}
            {errors.iconUrl && (
              <FormErrorMessage>{errors.iconUrl}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.screenshots}>
            <FormLabel>スクリーンショット</FormLabel>
            <ImageUploadButton
              label="ファイルを選択"
              onUpload={(url) => setScreenshots([...screenshots, url])}
            />
            <HStack spacing={2}>
              {screenshots.map((screenshot, index) => (
                <Image key={index} src={screenshot} boxSize="100px" height="177px" />
              ))}
            </HStack>
            {errors.screenshots && (
              <FormErrorMessage>{errors.screenshots}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.appType}>
            <FormLabel>アプリ種別</FormLabel>
            <Stack direction="row">
              {app_type.map((type) => (
                <Checkbox
                  key={type}
                  isChecked={appType === type}
                  onChange={(e) => setAppType(e.target.checked ? type : "")}
                >
                  {type}
                </Checkbox>
              ))}
            </Stack>
            {errors.appType && (
              <FormErrorMessage>{errors.appType}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.category}>
            <FormLabel>カテゴリ</FormLabel>
            <Select
              placeholder="選択してください"
              onChange={(e) => setCategory(e.target.value)}
              bg="white"
              size="lg"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            {errors.category && (
              <FormErrorMessage>{errors.category}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.status}>
            <FormLabel>公開状況</FormLabel>
            <Stack direction="row">
              {public_status.map((stat) => (
                <Checkbox
                  key={stat}
                  isChecked={status===stat}
                  onChange={(e) => setStatus(e.target.checked ? stat : "")}
                  >
                    {stat}
                  </Checkbox>
              ))}
            </Stack>
            {errors.status && <FormErrorMessage>{errors.status}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.groupUrl}>
            <FormLabel>GoogleグループURL</FormLabel>
            <Input ref={groupUrlRef} type="text" placeholder="URL" />
            {errors.groupUrl && (
              <FormErrorMessage>{errors.groupUrl}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.storeUrl}>
            <FormLabel>ストアURL</FormLabel>
            <Input ref={storeUrlRef} type="text" placeholder="URL" />
            {errors.storeUrl && (
              <FormErrorMessage>{errors.storeUrl}</FormErrorMessage>
            )}
          </FormControl>
          <Button type="submit" colorScheme="teal">
            投稿する
          </Button>
        </VStack>
      </Container>
      </Center>
    </form>
  );
};

export default FormPost;
