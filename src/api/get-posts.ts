import { BASE_URL } from "@/constants";
import { DisplayPost } from "@/types/posts";

export const getPosts = async (
  appType?: string,
  category?: string,
  status?: string,
): Promise<DisplayPost[]> => {
  const queryParams = new URLSearchParams();

  if (appType) queryParams.append("app_type", appType);
  if (category) queryParams.append("category", category);
  if (status) queryParams.append("public_status", status);

  const url = `${BASE_URL}/api/posts${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  const res = await fetch(url, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();
  return data;
};
