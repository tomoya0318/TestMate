'use client';
import { getAllPost } from "@/api/get-all-post";
import { PostProps } from "@/types/post";
import Link from "next/link";
import { Box, Container, HStack, VStack, Image, Select, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import LikeButton from "./_components/like-button";
import CommentButton from "./_components/comment-button";

const Postpage = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [appType, setAppType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts: PostProps[] = await getAllPost();
        setPosts(allPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = async () => {
    try {
      const postsData: PostProps[] = await getAllPost(appType, category, status);
      setPosts(postsData);
    } catch (error) {
      console.error("Failed to search posts:", error);
    }
  };

  const appTypes = ["アプリ", "ゲーム"];
  const categories = [
    "アクション", "アドベンチャー", "アーケード", "カード", "シミュレーション", "スポーツ",
    "パズル", "パチンコ＆麻雀、ほか", "ボード", "ミニゲーム", "レース", "ロールプレイング",
    "単語", "戦略", "教育", "雑学", "音楽＆リズム"
  ];
  const statuses = ["テスト中", "リリース済み"];

  return (
    <Container bg="#0DCEDA" mt={10} p={10}>
      <VStack align="stretch" spacing={4}>
        <Container fontSize={40} textAlign="center">
          Post
        </Container>
        <HStack>
          <Select
            placeholder="ゲーム/アプリ"
            onChange={(e) => setAppType(e.target.value)}
            bg="white"
            size="lg"
          >
            {appTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
          <Select
            placeholder="カテゴリ"
            onChange={(e) => setCategory(e.target.value)}
            bg="white"
            size="lg"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
          <Select
            placeholder="テスト中/リリース済み"
            onChange={(e) => setStatus(e.target.value)}
            bg="white"
            size="lg"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </Select>
          <Button onClick={handleSearch} colorScheme="teal" size="lg">
            検索
          </Button>
        </HStack>
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
                <Box fontSize="md" color="gray.500">
                  <CommentButton postId={post.id} />
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
