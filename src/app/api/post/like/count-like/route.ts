import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

//
export const POST = async (req: Request) => {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 },
      );
    }

    const likeCount = await prisma.like.count({
      where: {
        postId: postId,
      },
    });

    return NextResponse.json({ likeCount });
  } catch (error) {
    console.error("Error fetching like count:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
