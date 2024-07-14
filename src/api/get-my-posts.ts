import { PostProps } from "@/types/post";

export const getMyPosts = async (id: string): Promise<PostProps[]> => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010";
  try {
    const res = await fetch(`${baseUrl}/api/user/${id}/my-posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.statusText}`);
    }

    const data: PostProps[] = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
