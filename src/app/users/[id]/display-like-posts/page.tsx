"use client";
import React, { useEffect, useState } from "react";
import { getlikedPost } from "@/api/get-liked-posts";
import { PostProps } from "@/types/post";
import PostList from "@/components/element/post/post-list";
import {
  Container,
  Flex,
  Text,
  Heading,
  Link,
  Box,
  VStack,
} from "@chakra-ui/react"; // Import the missing 'Link' and 'Box' components

const DisplayLikedPostsPage = ({ params }: { params: { id: string } }) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = params.id;

  useEffect(() => {
    const fetchLikedPosts = async () => {
      try {
        const likedPosts = await getlikedPost(userId);
        setPosts(likedPosts);
      } catch (error) {
        setError("Failed to fetch liked posts");
      } finally {
        setLoading(false);
      }
    };

    fetchLikedPosts();
  }, [userId]);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <VStack justifyContent="center" alignItems="center">
          <Box
            sx={{
              fontSize: "40px",
              color: "#000000",
            }}
          >
            まだお気に入りが登録されていません...
          </Box>
          <Box
            sx={{
              fontSize: "40px",
              color: "#000000",
            }}
          ></Box>
          <Link
            sx={{
              fontSize: "24px",
              color: "#0DCEDA",
            }}
            href="/"
          >
            アプリを探しに行く
          </Link>
        </VStack>
      </Flex>
    );
  }

  return (
    <Container mt={1} p={10}>
      <Heading mb={6} textAlign="center">
        お気に入り一覧
      </Heading>
      <PostList posts={posts} />
    </Container>
  );
};

export default DisplayLikedPostsPage;
