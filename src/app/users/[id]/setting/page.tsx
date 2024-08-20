import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { SignOut } from "@/components/element/button/auth-button"; // Assuming this path is correct

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
        <SettingList
          text="・お気に入り一覧"
          link={`/user/${params.id}/display-like-posts`}
        />
        <SettingList
          text="・投稿一覧"
          link={`/user/${params.id}/display-my-posts`}
        />
        <SettingList
          text="・プロフィール編集"
          link={`/user/${params.id}/setting-profile`}
        />
        <SignOut />
        <AccuntDeleteList />
      </Box>
    </VStack>
  );
};

export default SettingPage;
