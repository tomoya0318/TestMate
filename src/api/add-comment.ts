import { CommentProps } from "@/types/comment";

type AddCommentProps = Omit<CommentProps, "id">;
export const addComment = async ({
  content,
  postId,
  userId,
}: AddCommentProps) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010";
  const res = await fetch(`${baseUrl}/api/post/comment/add-comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, postId, userId }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
