import { UserProps } from "@/types/user";

export const updateUser = async (id: string, updatedData: Partial<UserProps>): Promise<UserProps> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010";
  const res = await fetch(`${baseUrl}/api/user/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    throw new Error("Failed to update user");
  }

  const data: UserProps = await res.json();
  return data;
};
