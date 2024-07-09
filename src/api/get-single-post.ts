import { PostProps } from "@/types/post";

export const getSinglePost = async (id: number): Promise<PostProps> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3010';
  const res = await fetch(`${baseUrl}/api/post/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data: PostProps = await res.json();
  return data;
};