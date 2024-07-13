'use client';
import { getAllPost } from "@/api/get-all-post";
import { countLike } from "@/api/count-like";
import { toggleLike } from "@/api/toggle-like";
import { PostProps } from "@/types/post";
import { checkLike } from "@/api/check-like";
import Link from "next/link";
import { Box, Container, HStack, VStack, Image, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Postpage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [likeCounts, setLikeCounts] = useState<{[key: string]: number}>({});
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchPostsAndLikes = async () => {
      const postsData: PostProps[] = await getAllPost();
      setPosts(postsData);

      const likeCountsData: { [key: string]: number } = {};
      const likedPostsData: { [key: string]: boolean } = {};

      for (const post of postsData) {
        const likeCount = await countLike(post.id);
        likeCountsData[post.id] = likeCount;

        if (session && session.user?.id) {
          const liked = await checkLike(post.id, session.user.id);
          likedPostsData[post.id] = liked;
        }
      }
      setLikeCounts(likeCountsData);
      setLikedPosts(likedPostsData);
    };
    if (session) {
      fetchPostsAndLikes();
    }
  }, [session]);

  const handleLikeClick = async (event: React.MouseEvent, postId: string) => {
    event.stopPropagation();
    event.preventDefault();
    if (!session || !session.user?.id) {
      signIn(); // サインインしていない場合はサインイン画面にリダイレクト
      return;
    }

    // Optimistically update the UI
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    setLikeCounts(prev => ({
      ...prev,
      [postId]: likedPosts[postId] ? prev[postId] - 1 : prev[postId] + 1,
    }));

    const response = await toggleLike(postId, session.user.id);
    if (response.liked !== undefined) {
      setLikedPosts(prev => ({ ...prev, [postId]: response.liked }));
      setLikeCounts(prev => ({
        ...prev,
        [postId]: response.liked ? prev[postId] + 1 : prev[postId] - 1,
      }));
    }
  };

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
                  <Image src="/initial_icon.png" alt="app icon" />
                </Box>
                <Box fontSize="xl" fontWeight="bold">
                  {post.title}
                </Box>
                <Box fontSize="md" color="gray.500">
                  {likeCounts[post.id] !== undefined ? `${likeCounts[post.id]} Likes` : 'Loading...'}
                </Box>
                <IconButton
                  icon={likedPosts[post.id] ? <FaHeart color="red" /> : <FaRegHeart />}
                  onClick={(event) => handleLikeClick(event, post.id)}
                  aria-label="Like"
                />
              </HStack>
            </Link>
          </Container>
        ))}
      </VStack>
    </Container>
  );
};

export default Postpage;
