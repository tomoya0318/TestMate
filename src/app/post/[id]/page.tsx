"use client";
import { getSinglePost } from "@/api/get-single-post";
import { getCommentsAndUserByPostId } from "@/api/get-commnets-and-user-by-postId";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LikeButton from "../../../components/element/post/like-button";
import CommentButton from "../../../components/element/post/comment-button";
import { CommentAndUserImageProps } from "@/types/comment";
import Link from "next/link";
import { AddCommentForm } from "./_components/add-comment-form";
import { useSession } from "next-auth/react";
import { getSingleUser } from "@/api/get-single-user";
import { FaUser } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PostDescription = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<CommentAndUserImageProps[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      const postData = await getSinglePost(params.id);
      setPost(postData);

      try {
        if (session?.user?.id) {
          const userData = await getSingleUser(session.user.id);
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }

      const commentsData = await getCommentsAndUserByPostId(params.id);
      setComments(commentsData);
    };

    fetchPostAndComments();
  }, [params.id, session]);

  if (!post) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Flex justifyContent="center" alignItems="center" py={10}>
      <Box
        w="100%"
        maxW="800px"
        textAlign="center"
        p={5}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
      >
        <HStack spacing={4} justify="space-between" align="center" mb={4}>
          <Image src={post.iconUrl} boxSize="96px" alt="icon" />
          <VStack align="flex-start" spacing={0} flex="1">
            <Heading size="lg">{post.title}</Heading>
            <Text fontSize="sm" color="gray.500">
              {post.short}
            </Text>
          </VStack>
          <VStack align="center">
            <Image
              boxSize="80px"
              borderRadius="full"
              src={user?.image || "/default-profile.png"}
              alt="user image"
            />
            <Text>{user?.name}</Text>
          </VStack>
        </HStack>
        <HStack spacing={4} mb={4} justifyContent="center">
          <CommentButton postId={post.id} />
          <HStack alignItems="center">
            <FaUser />
            <Text>44</Text> {/* ダミーデータ：必要ならばAPIから取得して表示 */}
          </HStack>
          <LikeButton postId={post.id} />
        </HStack>
        <Box mb={4}>
          <Slider {...settings}>
            {post.screenshots.map((screenshot: string, index: number) => (
              <Image
                key={index}
                src={screenshot}
                width="100px"
                height="177px"
                alt={`screenshot-${index}`}
                objectFit="contain"
                borderRadius="md"
                mx="auto"
              />
            ))}
          </Slider>
        </Box>
        <Text textAlign="left" mb={4}>
          {post.description}
        </Text>
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
              cursor="pointer"
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
              cursor="pointer"
            >
              テスターになる
            </Box>
          </Link>
        </HStack>
        <Box textAlign="left" mb={4}>
          <Heading size="md" mb={4}>
            コメント
          </Heading>
          {session?.user?.id && (
            <AddCommentForm userId={session.user.id} postId={post.id} />
          )}
        </Box>
        <VStack spacing={4} align="left">
          {comments.map((comment: CommentAndUserImageProps) => (
            <HStack
              key={comment.id}
              p={3}
              borderWidth="1px"
              borderRadius="md"
              align="start"
              spacing={4}
            >
              <Image
                boxSize="40px"
                borderRadius="full"
                src={comment.user.image || "/default-profile.png"}
                alt="user image"
              />
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
