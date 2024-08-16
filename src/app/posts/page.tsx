"use client";
import { getPosts } from "@/api/get-posts";
import { Post } from "@/types/posts";
import { APP_TYPE, CATEGORIES, PUBLIC_STATUS} from "@/constants/index";
import {
  Container,
  HStack,
  Select,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import PostList from "./_components/post-list";

const Postpage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [appType, setAppType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts: Post[] = await getPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = async () => {
    try {
      const postsData: Post[] = await getPosts(appType, category, status);
      setPosts(postsData);
    } catch (error) {
      console.error("Failed to search posts:", error);
    }
  };
  
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
            {APP_TYPE.map((type) => (
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
            {CATEGORIES.map((category) => (
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
            {PUBLIC_STATUS.map((status) => (
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
