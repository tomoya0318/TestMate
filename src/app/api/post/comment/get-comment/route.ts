import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

export const POST = async (req: Request) => {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 },
      );
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);

    let errorMessage = "Unknown error";
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return NextResponse.json(
      { message: "Error", error: errorMessage },
      { status: 500 },
    );
  }
};
