"use client";
import React, { useEffect, useState } from "react";
import { getlikedPost } from "@/api/get-liked-posts";
import { PostProps } from "@/types/post";
import PostList from "@/components/element/post/post-list";
import { Container, Flex, Text, Heading } from "@chakra-ui/react";

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
        <Text>{error}</Text>
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
