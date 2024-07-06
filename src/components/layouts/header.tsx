import { Box, HStack } from "@chakra-ui/react";
import Link from "next/link";

const Header = async() => {
  return (
    <Box w="100%" bg="gray.100" p={4} boxShadow="md">
      <HStack spacing={4} justifyContent="space-between">
        <Link href="/">
          top page
        </Link>
      </HStack>
    </Box>
  );
};

export default Header;
