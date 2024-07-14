import { Box, Center, Text } from "@chakra-ui/react";
import { auth } from "@/libs/auth";

const Footer = async () => {
  const session = await auth();
  return (
    <Box as="footer" w="100%" bg="gray.100" p={4} boxShadow="md">
      <Center>
        <Text
          style={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
            fontSize: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Testmate
        </Text>
      </Center>
    </Box>
  );
};

export default Footer;
