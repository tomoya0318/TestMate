import React from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  HStack,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { DisplayPost } from "@/types/posts";
import LikeButton from "../../../app/posts/_components/like-button";
import CommentButton from "../../../app/posts/_components/comment-button";
import { FaUser } from "react-icons/fa";

interface PostListProps {
  posts: DisplayPost[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <VStack align="stretch" spacing={4}>
      {posts.map((post: DisplayPost) => (
        <Container
          key={post.id}
          bg="white"
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
          mb={4}
          boxShadow="md"
        >
          <Link href={`/post/${post.id}`}>
            <HStack spacing={4} alignItems="center">
              <Box boxSize="100px">
                <Image src={post.iconUrl} alt="app icon" borderRadius="md" />
              </Box>
              <VStack align="start" spacing={1} flex="1">
                <Text fontSize="xl" fontWeight="bold">
                  {post.title}
                </Text>
                <Text fontSize="md" color="gray.500">
                  {post.short}
                </Text>
                <HStack spacing={4}>
                  <CommentButton postId={post.id} />
                  <HStack alignItems="center">
                    <FaUser />
                    <Text>44</Text> {/* ダミーデータ：必要ならばAPIから取得して表示 */}
                  </HStack>
                  <LikeButton postId={post.id} />
                </HStack>
              </VStack>
              <Box ml="auto">
                <Image src="/arrow.png" alt="arrow" boxSize="24px" />
              </Box>
            </HStack>
          </Link>
        </Container>
      ))}
    </VStack>
  );
};

export default PostList;
