'use client';
import { getSinglePost } from "@/api/get-single-post";
import { getCommentsAndUserByPostId } from "@/api/get-commnets-and-user-by-postId";
import { Box, Flex, Text, Heading, Button, Image, VStack, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LikeButton from "../_components/like-button";
import CommentButton from "../_components/comment-button";
import { CommentAndUserImageProps } from "@/types/comment";
import Link from 'next/link';
import { AddCommentForm } from "./_components/add-comment-form";
import { useSession } from "next-auth/react";

const PostDescription = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<CommentAndUserImageProps[]>([]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const postData = await getSinglePost(params.id);
      setPost(postData);

      const commentsData = await getCommentsAndUserByPostId(params.id);
      setComments(commentsData);
    };

    fetchPostAndComments();
  }, [params.id]);

  if (!post) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  return (
    <Flex justifyContent="center" alignItems="center" py={10}>
      <Box w="100%" maxW="800px" textAlign="center" p={5} borderWidth="1px" borderRadius="lg">
        <HStack spacing={4} justify="space-between" align="center" mb={4}>
          <Image src={post.iconUrl} boxSize="100px" alt="icon" />
          <VStack align="flex-start" spacing={0}>
            <Heading size="lg">{post.title}</Heading>
            <Text fontSize="sm" color="gray.500">{post.short}</Text>
          </VStack>
          <HStack spacing={2}>
            <CommentButton postId={post.id} />
            <LikeButton postId={post.id} />
          </HStack>
        </HStack>
        <Image src={post.screenshots} mb={4} alt="screenshots" />
        <Text textAlign="left" mb={4}>{post.description}</Text>
        <HStack spacing={20} mb={4} justifyContent="center">
          <Link href="/" passHref>
            <Box
              display="inline-block"
              px={4}
              py={2}
              bg="gray.300"
              color="gray.700"
              borderRadius="md"
              textAlign="center"
            >
              戻る
            </Box>
          </Link>
          <Link href={`/post/tester-registar-manual`} passHref>
            <Box
              display="inline-block"
              px={4}
              py={2}
              bg="teal.500"
              color="white"
              borderRadius="md"
              textAlign="center"
            >
              テスターになる
            </Box>
          </Link>
        </HStack>
        <Box textAlign="left" mb={4}>
          <Heading size="md" mb={4}>コメント</Heading>
          {session?.user?.id && (
            <AddCommentForm userId={session.user.id} postId={post.id} />
          )}
        </Box>
        <VStack spacing={4} align="left">
          {comments.map((comment: CommentAndUserImageProps) => (
            <HStack key={comment.id} p={3} borderWidth="1px" borderRadius="md" align="start" spacing={4}>
              <Image boxSize="40px" borderRadius="full" src={comment.user.image || '/default-profile.png'} alt="user image" />
              <Box>
                <Text>{comment.content}</Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default PostDescription;
