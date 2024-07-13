import { Box, HStack, Center, Text, Button, Image, Spacer } from "@chakra-ui/react";
import Link  from "next/link"; 
import { SignIn, SignOut } from "@/components/element/button/auth-button";
import { auth } from "@/libs/auth";


const SettingList: React.FC<{ text: string ,link: string}> = ({ text, link }) => { // Add 'link' to the destructured props
    return (
        <Link href={link} >
            <Box w={700} h={100} bg="white" p={4} mt={10} boxShadow="md" borderRadius="4" display="flex" alignItems="center">
                <HStack justifyContent="space-between" w="full">
                    <Text style={{ fontWeight: 'bold', whiteSpace: 'nowrap', fontSize: '30px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%' }}>
                        {text}
                    </Text>
                    <Spacer />
                    <Image src="/arrow.png" />
                </HStack>
            </Box>
        </Link>
    );
};

export default SettingList;