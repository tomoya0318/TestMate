"use client";
import React, { useEffect, useState } from "react";
import { getMyPosts } from "@/api/get-my-posts";
import { PostProps } from "@/types/post";
import PostList from "@/components/element/post/post-list";
import {
  Container,
  Flex,
  Text,
  Heading,
  Box,
  Link,
  VStack,
} from "@chakra-ui/react";

const DisplayMyPostsPage = ({ params }: { params: { id: string } }) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = params.id;

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const myPosts = await getMyPosts(userId);
        setPosts(myPosts);
      } catch (error) {
        setError("Failed to fetch user's posts");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
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
        <VStack>
          <Box
            sx={{
              fontSize: "40px",
              color: "#000000",
            }}
          >
            まだ投稿されていません...
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
            href="/post/new"
          >
            アプリを投稿しにいく
          </Link>
        </VStack>
      </Flex>
    );
  }

  return (
    <Container mt={10} p={5}>
      <Heading mb={6} textAlign="center">
        自分の投稿一覧
      </Heading>
      <PostList posts={posts} />
    </Container>
  );
};

export default DisplayMyPostsPage;
