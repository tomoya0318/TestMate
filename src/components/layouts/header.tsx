import { Box, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { SignIn, SignOut } from "@/components/element/button/auth-button";
import { auth } from "@/libs/auth";

const Header = async () => {
  const session = await auth();
  return (
    <Box w="100%" bg="gray.100" p={4} boxShadow="md">
      <HStack spacing={4} justifyContent="space-between">
        <Link href="/">top page</Link>
        <Link href="/post/new">post</Link>
        {session?.user ? <SignOut /> : <SignIn />}
      </HStack>
    </Box>
  );
};

export default Header;
