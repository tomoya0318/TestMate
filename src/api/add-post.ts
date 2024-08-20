import { CreatePost } from "@/types/posts";
import { BASE_URL } from "@/constants";

export const addPost = async ({
  userId,
  title,
  short,
  description,
  iconUrl,
  screenshots,
  groupUrl,
  storeUrl,
  appType,
  category,
  publicStatus,
}: CreatePost) => {
  const res = await fetch(`${BASE_URL}/api/posts/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      title,
      short,
      description,
      iconUrl,
      screenshots,
      groupUrl,
      storeUrl,
      appType,
      category,
      publicStatus,
    }),
  });

  return res.json();
};
