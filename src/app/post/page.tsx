"use client";
import { getAllPost } from "@/api/get-all-post";
import { PostProps } from "@/types/post";
import Link from "next/link";
import {
  Box,
  Container,
  HStack,
  VStack,
  Image,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import LikeButton from "./_components/like-button";
import CommentButton from "./_components/comment-button";
import { FaRegComment, FaUser } from "react-icons/fa";

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
    "アクション",
    "アドベンチャー",
    "アーケード",
    "カード",
    "シミュレーション",
    "スポーツ",
    "パズル",
    "パチンコ＆麻雀、ほか",
    "ボード",
    "ミニゲーム",
    "レース",
    "ロールプレイング",
    "単語",
    "戦略",
    "教育",
    "雑学",
    "音楽＆リズム",
  ];
  const statuses = ["テスト中", "リリース済み"];

  return (
    <Container mt={1} p={10}>
      <VStack align="stretch" spacing={4}>
        <HStack>
          <Select
            placeholder="ゲーム/アプリ"
            onChange={(e) => setAppType(e.target.value)}
            bg="white"
            size="lg"
          >
            {appTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          <Select
            placeholder="カテゴリ"
            onChange={(e) => setCategory(e.target.value)}
            bg="white"
            size="lg"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Select
            placeholder="テスト中/リリース済み"
            onChange={(e) => setStatus(e.target.value)}
            bg="white"
            size="lg"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
          <Button onClick={handleSearch} colorScheme="teal" size="lg">
            検索
          </Button>
        </HStack>
        {posts.map((post: PostProps) => (
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
    </Container>
  );
};

export default Postpage;
