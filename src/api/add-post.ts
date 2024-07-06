import { PostProps } from "@/types/post";
export const addPost = async ({ userId, title, description }: PostProps) => {
    const res = await fetch(`/api/post/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, title, description }),
    });
  
    return res.json();
  };
  