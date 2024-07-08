import { getAllPost } from "@/api/get-all-post";
import { PostProps } from "@/types/post";
import {
  Box,
  Container,
  HStack,
  VStack,
  Image,
} from "@chakra-ui/react";

const Postpage = async() => {
  const posts: PostProps[] = await getAllPost();
  return (
    <VStack align="stretch" spacing={4}>
      <Container fontSize={40} textAlign="center">Post</Container>
      {posts.map((post: PostProps) => (
        <Container key={post.id}>
          <HStack spacing={4}>
            <Box boxSize="100px">
              <Image src='https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_14.png' boxSize="100px" />
            </Box>
            <Box fontSize="xl" fontWeight="bold">{post.title}</Box>
          </HStack>
        </Container>
      ))}
    </VStack>
  );
};

export default Postpage;
