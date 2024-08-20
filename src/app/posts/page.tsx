"use client";
import { getPosts } from "@/api/get-posts";
import { DisplayPost } from "@/types/posts";
import { APP_TYPE, CATEGORIES, PUBLIC_STATUS } from "@/constants/index";
import { Container, HStack, Select, Button, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import PostList from "./_components/post-list";
import { SelectBox } from "@/components/element/select-box";

const Postpage = () => {
  const [posts, setPosts] = useState<DisplayPost[]>([]);
  const [appType, setAppType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [publicStatus, setPublicStatus] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts: DisplayPost[] = await getPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = async () => {
    try {
      const postsData: DisplayPost[] = await getPosts(
        appType,
        category,
        publicStatus,
      );
      setPosts(postsData);
    } catch (error) {
      console.error("Failed to search posts:", error);
    }
  };

  return (
    <Container mt={1} p={10}>
      <VStack align="stretch" spacing={4}>
        <HStack>
          <SelectBox
            placeholder="ゲーム/アプリ"
            setState={setAppType}
            selects={APP_TYPE}
          />
          <SelectBox
            placeholder="カテゴリ"
            setState={setCategory}
            selects={CATEGORIES}/>
          <SelectBox
            placeholder="テスト中/リリース済み"
            setState={setPublicStatus}
            selects={PUBLIC_STATUS}/>
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
