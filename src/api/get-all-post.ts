import { PostProps } from "@/types/post";

export const getAllPost = async (appType?: string, category?: string, status?: string): Promise<PostProps[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010";

  let res;
  if (appType || category || status) {
    res = await fetch(`${baseUrl}/api/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appType, category, status }),
    });
  } else {
    res = await fetch(`${baseUrl}/api/post`, {
      method: 'GET',
    });
  }

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data: PostProps[] = await res.json();
  return data;
};
