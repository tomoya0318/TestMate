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
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

const TesterRegistarManualPage: React.FC = async () => {
    const scrennWidth = 800;
    return (
        <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            align='stretch'
            alignItems='flex-start'
        >
            <Container maxW='container.xl'>
                <VStack>
                    <Box bg='#0DCEDA' p='10' color='white' width={scrennWidth}>
                        <h1 style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '24px' }}>テスターに参加していただける方には、以下の3つをお願いします</h1>
                    </Box>
                    <Box p={10} color='black' width={scrennWidth} style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '24px' }}>
                        <OrderedList spacing={6}>
                            <ListItem><Link href='#registar'>Google Groupsに登録する</Link></ListItem>
                            <ListItem><Link href='#install'>アプリをインストールする</Link></ListItem>
                            <ListItem><Link href='#launch'>アプリを起動する</Link></ListItem>
                            <ListItem><Link href='#comment'>コメントする</Link></ListItem>
                        </OrderedList>
                    </Box>
                </VStack>
            </Container>
            <Container id='registar'>
                <VStack>
                    <Box width={scrennWidth} style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '24px' }}>
                        <Text>1. 以下のURLから、Google Groupsに登録する</Text>
                    </Box>
                    <Box width={scrennWidth}>
                        <Button colorScheme='blue' size='lg' >Google Groupsに登録</Button>
                    </Box>
                    <Box width={scrennWidth}>
                        <Image width={scrennWidth} src="/google_groups01.png" />
                        <Image width={scrennWidth} src="/google_groups02.png" />
                    </Box>
                </VStack>
            </Container>
            <Container id='install'>
                <VStack>
                    <Box width={scrennWidth} style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '24px' }}>
                        <Text>2. アプリをインストールする</Text>
                    </Box>
                    <Box width={scrennWidth}>
                        <Button colorScheme='blue' size='lg' >アプリをインストール</Button>
                    </Box>
                    <Alert width={scrennWidth} status='warning'>
                        <AlertIcon />
                        <AlertDescription>もし「リクエストされた URL は、このサーバー上に見つかりませんでした。」と表示される場合、Google Groupsに登録できていないかもしれません。もう一度試してみてください。</AlertDescription>
                    </Alert>
                    <Image width={scrennWidth} src="/playstore-sample.png"></Image>
                </VStack>
            </Container>
            <Container id='launch'>
                <VStack>
                    <Box width={scrennWidth} style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '24px' }}>
                        <Text>3. アプリを起動する</Text>
                    </Box>
                    <Box width={scrennWidth}　style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '20px' }}>
                        <Text>アプリを起動すると、テスター登録完了です！</Text>
                    </Box>
                    <Alert width={scrennWidth} status='error'>
                        <AlertIcon />
                        <AlertTitle>お願い</AlertTitle>
                        <AlertDescription>一度インストールしたら、特別な理由がない限り、アプリを削除しないようにお願いします。
                        （アンインストールしてしまうとテスターから外れてしまうため）</AlertDescription>
                    </Alert>
                </VStack>
            </Container>
            <Container id='comment'>
                <VStack>
                    <Box width={scrennWidth} style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '24px' }}>
                        <Text>4. コメントする</Text>
                    </Box>
                    <Box width={scrennWidth}　style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '20px' }}>
                        <Text>アプリ改善のため、使用した感想をコメントお願いします！</Text>
                    </Box>
                    <Box width={scrennWidth}>
                        <Button colorScheme='blue' size='lg' >コメントする</Button>
                    </Box>
                </VStack>
            </Container>
        </VStack>
    );
};

export default TesterRegistarManualPage;