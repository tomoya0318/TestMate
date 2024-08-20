import {
  Box,
  HStack,
  Avatar,
  Button,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { SignIn } from "@/components/element/button/auth-button";
import { auth } from "@/libs/auth";
import { FaPen } from "react-icons/fa";

const Header = async () => {
  const session = await auth();

  return (
    <Box w="100%" bg="gray.100" p={4} boxShadow="md">
      <Flex justifyContent="center" alignItems="center">
        <Flex
          w="100%"
          maxW="1200px"
          px={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack spacing={4} alignItems="center">
            <Image src="/headerIcon.png" alt="Logo" boxSize="60px" />
            <Link href="/">
              <Text
                fontFamily="Noto Sans JP"
                fontWeight="bold"
                fontSize="24px"
                lineHeight="100%"
              >
                TestMate
              </Text>
            </Link>
          </HStack>
          <HStack spacing={4} alignItems="center">
            <Link href="/posts/submit">
              <Button
                bg="#0DCEDA"
                color="white"
                _hover={{ bg: "#0ABAB5" }}
                rightIcon={<FaPen />}
                size="lg"
              >
                投稿する
              </Button>
            </Link>
            {session?.user ? (
              <Link href={`/user/${session.user.id}/setting`}>
                {session.user.image ? (
                  <Avatar size="sm" src={session.user.image} />
                ) : (
                  <Avatar size="sm" />
                )}
              </Link>
            ) : (
              <SignIn />
            )}
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
