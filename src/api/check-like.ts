export async function checkLike(postId: string, userId: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010";
    const response = await fetch(`${baseUrl}/api/post/like/check-like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, userId }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in toggleLike:", error);
    return { liked: false, error: true };
  }
}
