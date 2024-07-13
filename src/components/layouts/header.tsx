import { Box, HStack, Avatar } from "@chakra-ui/react";
import Link from "next/link";
import { SignIn, SignOut } from "@/components/element/button/auth-button";
import { auth } from "@/libs/auth";

const Header = async () => {
  const session = await auth();

  return (
    <Box w="100%" bg="gray.100" p={4} boxShadow="md">
      <HStack spacing={4} justifyContent="space-between">
        <Link href="/">TestMate</Link>
        <Link href="/post/new">投稿する</Link>
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
    </Box>
  );
};

export default Header;
