import { CommentAndUserImageProps } from "@/types/comment";

export const getCommentsAndUserByPostId = async (
  postId: string,
): Promise<CommentAndUserImageProps[]> => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010";
  const res = await fetch(`${baseUrl}/api/post/comment/get-comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  const data: CommentAndUserImageProps[] = await res.json();
  return data;
};
