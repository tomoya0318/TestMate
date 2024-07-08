import { PostProps } from "@/types/post";

export const getAllPost = async (): Promise<PostProps[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3010';
  const res = await fetch(`${baseUrl}/api/post`);

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data: PostProps[] = await res.json();
  return data;
};