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
  } catch (err) {
    return NextResponse.json({ messege: "Error", err }, { status: 500 });
  }
};
