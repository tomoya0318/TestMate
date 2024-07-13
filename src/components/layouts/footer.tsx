import { Box, HStack, Center, Text } from "@chakra-ui/react";
import Link from "next/link";
import { SignIn, SignOut } from "@/components/element/button/auth-button";
import { auth } from "@/libs/auth";

const Footer = async () => {
  const session = await auth();
return (
    <Box w="100%" h={200} bg="gray.100" p={4} mt={10} boxShadow="md">
        <Center>
            <Text style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Testmate
            </Text>
        </Center>
    </Box>
);
};

export default Footer;