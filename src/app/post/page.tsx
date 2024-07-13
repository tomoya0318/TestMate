'use client';
import { getAllPost } from "@/api/get-all-post";
import { PostProps } from "@/types/post";
import Link from "next/link";
import { Box, Container, HStack, VStack, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import LikeButton from "./_components/like-button";

const Postpage = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData: PostProps[] = await getAllPost();
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <Container bg="#0DCEDA" mt={10} p={10}>
      <VStack align="stretch" spacing={4}>
        <Container fontSize={40} textAlign="center">
          Post
        </Container>
        {posts.map((post: PostProps) => (
          <Container
            key={post.id}
            bg="#EBFFFA"
            border="1px"
            borderColor="gray.200"
          >
            <Link href={`/post/${post.id}`}>
              <HStack spacing={4}>
                <Box boxSize="100px">
                  <Image src={post.iconUrl} alt="app icon" />
                </Box>
                <Box fontSize="xl" fontWeight="bold">
                  {post.title}
                </Box>
                <Box fontSize="md" color="gray.500">
                  <LikeButton postId={post.id} />
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
