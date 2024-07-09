import { getSinglePost } from "@/api/get-single-post";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";

const PostDescription = async ({ params }: { params: { id: number } }) => {
  const post = await getSinglePost(params.id);
  return (
    <Flex justifyContent="center" alignItems="center">
      <Box w="100%" maxW="600px" textAlign="center">
        <Heading mb={4}>{post.title}</Heading>
        <Text>{post.description}</Text>
      </Box>
    </Flex>
  );
};

export default PostDescription;
