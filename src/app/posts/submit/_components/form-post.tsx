"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { addPost } from "@/api/add-post";
import { APP_TYPE, CATEGORIES, PUBLIC_STATUS } from "@/constants/index";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  useToast,
  Image,
  Select,
  HStack,
  VStack,
  Container,
  Center,
} from "@chakra-ui/react";
import { ImageUploadButton } from "@/components/element/button/image-upload-button";
import { InputField } from "./input-field";
import { TextareaField } from "./textarea-field";
import { SelectBox } from "./select-box";
import { CreatePost } from "@/types/posts";

const FormPost: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  //値の一時保存用
  const titleRef = useRef<HTMLInputElement | null>(null);
  const shortRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const groupUrlRef = useRef<HTMLInputElement | null>(null);
  const storeUrlRef = useRef<HTMLInputElement | null>(null);
  const [iconUrl, setIconUrl] = useState<string>("");
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [appType, setAppType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [publicStatus, setPublicStatus] = useState<string>("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreatePost, string>>
  >({});

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

    const newErrors = { ...errors };
    if (!title) newErrors.title = "タイトルは必須です";
    if (!short) newErrors.short = "簡単な説明は必須です";
    if (!description) newErrors.description = "詳細は必須です";
    if (!iconUrl) newErrors.iconUrl = "アイコンURLは必須です";
    if (screenshots.length === 0)
      newErrors.screenshots = "スクリーンショットは必須です";
    if (!appType) newErrors.appType = "アプリ種別は必須です";
    if (!category) newErrors.category = "カテゴリは必須です";
    if (!publicStatus) newErrors.publicStatus = "公開状況は必須です";
    if (!groupUrl) newErrors.groupUrl = "GoogleグループURLは必須です";
    if (!storeUrl) newErrors.storeUrl = "ストアURLは必須です";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    try {
      const postResponse = await addPost({
        userId,
        title,
        short,
        description,
        iconUrl,
        screenshots,
        groupUrl,
        storeUrl,
        appType,
        category,
        publicStatus,
      });
      console.log("Post response:", postResponse);

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
            <InputField
              label="アプリ名"
              error={errors.title}
              placeholder="アプリ名を入力してください"
              ref={titleRef}
            />
            <TextareaField
              label="簡単な説明"
              error={errors.short}
              placeholder="簡単な説明を20文字以内で入力してください"
              ref={shortRef}
            />
            <TextareaField
              label="詳細"
              error={errors.description}
              placeholder="詳細を入力してください"
              ref={descriptionRef}
            />
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
                  <Image
                    key={index}
                    src={screenshot}
                    boxSize="100px"
                    height="177px"
                  />
                ))}
              </HStack>
              {errors.screenshots && (
                <FormErrorMessage>{errors.screenshots}</FormErrorMessage>
              )}
            </FormControl>
            <SelectBox
              label="アプリ種別"
              error={errors.appType}
              state={appType}
              setState={setAppType}
              selects={APP_TYPE}
            />
            <FormControl isInvalid={!!errors.category}>
              <FormLabel>カテゴリ</FormLabel>
              <Select
                placeholder="選択してください"
                onChange={(e) => setCategory(e.target.value)}
                bg="white"
                size="lg"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              {errors.category && (
                <FormErrorMessage>{errors.category}</FormErrorMessage>
              )}
            </FormControl>
            <SelectBox
              label="公開状況"
              error={errors.publicStatus}
              state={publicStatus}
              setState={setPublicStatus}
              selects={PUBLIC_STATUS}
            />
            <InputField
              label="GoogleグループURL"
              error={errors.groupUrl}
              placeholder="GoogleグループのURLを入力してください"
              ref={groupUrlRef}
            />
            <InputField
              label="ストアURL"
              error={errors.storeUrl}
              placeholder="ストアのURLを入力してください"
              ref={storeUrlRef}
            />
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
