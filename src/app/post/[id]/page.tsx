'use client';
import { getSinglePost } from "@/api/get-single-post";
import { Box, Flex, Text, Heading, Button, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LikeButton from "../_components/like-button";

const PostDescription = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await getSinglePost(params.id);
      setPost(postData);
    };

    fetchPost();
  }, [params.id]);

  if (!post) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  const handleAttend = () => {
    // テスターに参加するボタンのハンドラー
  };

  return (
    <Flex justifyContent="center" alignItems="center" py={10}>
      <Box w="100%" maxW="600px" textAlign="center" p={5} borderWidth="1px" borderRadius="lg">
        <Image src={post.iconUrl}></Image>
        <Heading mb={4}>{post.title}</Heading>
        <Text mb={4}>{post.short}</Text>
        <Text mb={4}>{post.description}</Text>
        <Box mb={4}>
          <LikeButton postId={post.id} />
        </Box>
        <Image src={post.screenshots}></Image>
        
        <Button onClick={handleAttend} colorScheme="teal">
          テスターに参加する
        </Button>
      </Box>
    </Flex>
  );
};

export default PostDescription;
