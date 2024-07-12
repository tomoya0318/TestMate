import { PostProps } from "@/types/post";
type PartialPostProps = Omit<PostProps, "id" | "likes">;
export const addPost = async ({
  title,
  description,
  userId,
}: PartialPostProps) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010";
  const res = await fetch(`${baseUrl}/api/post/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, userId }),
  });

  return res.json();
};
