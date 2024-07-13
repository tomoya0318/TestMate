import { UserProps } from "@/types/user";
export const getSingleUser = async (id: string): Promise<UserProps> => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010";
  const res = await fetch(`${baseUrl}/api/user/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data: UserProps = await res.json();
  return data;
};
