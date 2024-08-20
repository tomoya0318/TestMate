"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSingleUser } from "@/api/get-single-user";
import { updateUser } from "@/api/update-user";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  Image,
  IconButton,
  useToast,
  VStack,
  Heading,
  Center,
} from "@chakra-ui/react";
import { UserProps } from "@/types/user";
import { FaPlusCircle } from "react-icons/fa";

const UserPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState<UserProps | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = Array.isArray(params.id) ? params.id[0] : params.id;
        if (!userId) {
          throw new Error("User ID is missing");
        }
        const userData = await getSingleUser(userId);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ

    if (!user) return;

    try {
      const updatedData = {
        name: user.name,
        introduce: user.introduce,
        image: user.image,
      };

      const updatedUser = await updateUser(user.id, updatedData);
      setUser(updatedUser);
      toast({
        title: "User updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to update user:", error);
      toast({
        title: "Failed to update user",
        description: String(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (user) {
          setUser({ ...user, image: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Center>
      <Box
        w="full"
        maxW="md"
        bg="white"
        p={6}
        mt={10}
        borderRadius="md"
        boxShadow="md"
      >
        <form onSubmit={handleSave}>
          <VStack spacing={4}>
            <Heading size="lg" textAlign="center">
              プロフィール編集
            </Heading>
            <Box position="relative">
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user.image || "/default-profile.png"}
                alt="Profile Image"
              />
              <IconButton
                icon={<FaPlusCircle />}
                aria-label="Upload image"
                position="absolute"
                top="0"
                right="0"
                borderRadius="full"
                onClick={() => inputFileRef.current?.click()}
              />
              <Input
                type="file"
                ref={inputFileRef}
                display="none"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Box>
            <FormControl>
              <FormLabel>ニックネーム</FormLabel>
              <Input
                value={user.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>自己紹介（200文字以内）</FormLabel>
              <Textarea
                value={user.introduce || ""}
                onChange={(e) =>
                  setUser({ ...user, introduce: e.target.value })
                }
              />
            </FormControl>
            <Button type="submit" colorScheme="teal">
              保存
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default UserPage;
