import { TagProps } from "@/types/tag";

type Tag_postIdProps = TagProps & {
  postId: string;
};
export const addTag = async ({
  appType,
  category,
  status,
  postId,
}: Tag_postIdProps) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010";
  const res = await fetch(`${baseUrl}/api/post/new/tag/add-tag`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ appType, category, status, postId }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  return data;
};
