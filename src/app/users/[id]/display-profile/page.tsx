"use client";
import React, { useEffect, useState } from "react";
import { getSingleUser } from "@/api/get-single-user";
import { getMyPosts } from "@/api/get-my-posts";
import { UserProps } from "@/types/user";
import { PostProps } from "@/types/post";
import PostList from "@/components/element/post/post-list";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  VStack,
} from "@chakra-ui/react";

const DisplayProfilePage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = params.id;

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const userProfile = await getSingleUser(userId);
        setUser(userProfile);

        const myPosts = await getMyPosts(userId);
        setPosts(myPosts);
      } catch (error) {
        setError("Failed to fetch user profile or posts");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
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
    <Container mt={10} p={5}>
      <VStack align="center" spacing={4} mb={6}>
        <Image
          borderRadius="full"
          boxSize="100px"
          src={user?.image || "/default-profile.png"}
          alt="Profile Image"
        />
        <Heading size="md">{user?.name}</Heading>
        <Text>{user?.email}</Text>
        <Text>{user?.introduce}</Text>
        <Text>投稿数: {posts.length}</Text>
      </VStack>
      <PostList posts={posts} />
    </Container>
  );
};

export default DisplayProfilePage;
