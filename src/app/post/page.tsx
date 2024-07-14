"use client";
import { getAllPost } from "@/api/get-all-post";
import { PostProps } from "@/types/post";
import {
  Container,
  HStack,
  Select,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import PostList from '@/components/element/post/post-list';

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
        <PostList posts={posts} />
      </VStack>
    </Container>
  );
};

export default Postpage;
