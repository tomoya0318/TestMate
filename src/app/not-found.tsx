import { Link, Box, VStack, Text } from '@chakra-ui/react';

const commonStyles = {
  fontFamily: "Noto Sans JP",
  fontWeight: "bold",
  lineHeght: 1,
  alignItems: "center",
}

const NotFound = () => {
  return (
    <VStack
      justifyContent="center"
      alignItems="center"
    >
      <Box 
        sx={{
          ...commonStyles,
          fontSize: "128px",
          color: "#0DCEDA"
        }}
      >
        404
      </Box>
      <Box
        sx={{
          ...commonStyles,
          fontSize: "40px",
          color: "#000000"
        }}
      >
        お探しのページは見つかりません
      </Box>
      <Link
        sx={{
          ...commonStyles,
          fontSize: "24px",
          color: "#0DCEDA",
        }}
        href="/"
      >
        ホームに戻る
      </Link>
    </VStack>
  );
};

export default NotFound;
