import React from "react";
import { Center, Container, Box, AbsoluteCenter, Text } from '@chakra-ui/react'
import { Stack, HStack, VStack, StackDivider } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react'
import Link from "next/link";
import dynamic from "next/dynamic"; // Add the import statement for dynamic
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
const AccuntDeleteList  = dynamic(() => import("./_components/account-delete-list")); // Add the import statement for AccuntDeleteList
const SettingList = dynamic(() => import("./_components/setting-list"));

const SettingPage: React.FC = () => {
    return (
        <VStack>
            <Box p={5} style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '30px' }}>
                <Text>マイページ</Text>
            </Box>
            <Box p={5}>
                <SettingList text="・お気に入り一覧" link="https://qiita.com/" />
                <SettingList text="・投稿一覧" link="https://qiita.com/" />
                <SettingList text="・プロフィール編集" link="https://qiita.com/" />
                <SettingList text="・パスワード変更" link="https://qiita.com/" />
                <SettingList text="・ログアウト" link="https://qiita.com/" />
                <AccuntDeleteList /> {/* Fix the typo in the component name */}
            </Box>
        </VStack>
    );
};

export default SettingPage;