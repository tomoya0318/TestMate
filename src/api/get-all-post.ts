import { PostProps } from "@/types/post";

export const getAllPost = async (appType?: string, category?: string, status?: string): Promise<PostProps[]> => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010";
  
  // クエリパラメータを構築
  const queryParams = new URLSearchParams();
  if (appType) queryParams.append("appType", appType);
  if (category) queryParams.append("category", category);
  if (status) queryParams.append("status", status);
  
  const res = await fetch(`${baseUrl}/api/post?${queryParams.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data: PostProps[] = await res.json();
  return data;
};
