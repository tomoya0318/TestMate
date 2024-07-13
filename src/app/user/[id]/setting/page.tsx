import React from "react";
import { Center, Container, Box, AbsoluteCenter, Text } from "@chakra-ui/react";
import { Stack, HStack, VStack, StackDivider, Button } from "@chakra-ui/react";
import { signOutAction } from "@/action/sign-out";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const AccuntDeleteList = dynamic(
  () => import("./_components/account-delete-list"),
);
const SettingList = dynamic(() => import("./_components/setting-list"));

const SettingPage = ({ params }: { params: { id: string } }) => {
  return (
    <VStack>
      <Box
        p={5}
        style={{ fontWeight: "bold", whiteSpace: "nowrap", fontSize: "30px" }}
      >
        <Text>マイページ</Text>
      </Box>
      <Box p={5}>
        <SettingList text="・お気に入り一覧" link="https://qiita.com/" />
        <SettingList text="・投稿一覧" link="https://qiita.com/" />
        <SettingList
          text="・プロフィール編集"
          link={`/user/${params.id}/profile`}
        />
        <SettingList text="・パスワード変更" link="https://qiita.com/" />

        <AccuntDeleteList />
      </Box>
    </VStack>
  );
};

export default SettingPage;
