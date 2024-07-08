import { Link, Box, VStack, Text } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <VStack
      justifyContent="center"
      alignItems="center"
    >
      <Box 
        fontSize="128px"
        fontWeight="bold"
        fontFamily="Noto Sans JP"
        color="#0DCEDA"
        lineHeight={1}
        alignItems="center"
      >
        404
      </Box>
      <Box
        fontSize="40px"
        fontWeight="bold" 
        fontFamily="Noto Sans JP"
        color="#000000"
        lineHeight={1}
        alignItems="center"
      >
        お探しのページは見つかりません
      </Box>
      <Link
        fontSize="24"
        color="#0DCEDA"
        fontWeight="bold"
        fontFamily="Noto Sans JP"
        alignItems="center"
        href="/"
      >
        ホームに戻る
      </Link>
    </VStack>
  );
};

export default NotFound;
