"use client";
import React from "react";
import { signOutAction } from "@/action/sign-out";
import { signInAction } from "@/action/sign-in";
import { Button } from "@chakra-ui/react";
import { Box, HStack, Text, Spacer, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const SignIn: React.FC = () => {
  return (
    <form action={signInAction}>
      <Button type="submit" color={"white"} bg={"#0DCEDA"} size="lg">
        サインイン
      </Button>
    </form>
  );
};

export const SignOut: React.FC = () => {
  const router = useRouter();

  const handleSignOut = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // サインアウトのアクションを実行する
      await signOutAction();

      // サインアウト後にルートにリダイレクトする
      router.push("/");
    } catch (error) {
      console.error("サインアウト中にエラーが発生しました:", error);
    }
  };

  return (
    <form onSubmit={handleSignOut} method="POST">
      <Button
        type="submit"
        w={700}
        h={100}
        bg="white"
        p={4}
        mt={10}
        boxShadow="md"
        borderRadius="4"
        display="flex"
        alignItems="center"
      >
        <HStack justifyContent="space-between" w="full">
          <Text
            style={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              fontSize: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              height: "100%",
            }}
          >
            サインアウト
          </Text>
          <Spacer />
          <Image src="/arrow.png" />
        </HStack>
      </Button>
    </form>
  );
};
