import { getAllPost } from "@/api/get-all-post";
import { PostProps } from "@/types/post";
import Link from "next/link";
import { Box, Container, HStack, VStack, Image } from "@chakra-ui/react";

const Postpage = async () => {
  const posts: PostProps[] = await getAllPost();
  return (
    <Container  bg="#0DCEDA" mt={10} p={10}>
      <VStack align="stretch" spacing={4}>
        <Container fontSize={40} textAlign="center" >
          Post
        </Container>
        {posts.map((post: PostProps) => (
          <Container key={post.id} bg="#EBFFFA" border="1px" borderColor="gray.200">
            <Link href={`/post/${post.id}`}>
              <HStack spacing={4}>
                <Box boxSize="100px">
                  <Image src="/initial_icon.png" alt="app icon" />
                </Box>
                <Box fontSize="xl" fontWeight="bold">
                  {post.title}
                </Box>
              </HStack>
            </Link>
          </Container>
        ))}
      </VStack>
    </Container>
  );
};

export default Postpage;
