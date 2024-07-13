import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

// POSTへのお気に入り登録確認用API
export const POST = async (req: Request) => {
  try {
    const { postId, userId } = await req.json();

    // postIdとuserIdが存在することを確認
    if (!postId || !userId) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // すでにお気に入りに登録されているか確認
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    // お気に入りに登録されているかどうかを返す
    if (existingLike) {
      return NextResponse.json(true);
    } else {
      return NextResponse.json(false);
    }
  } catch (error) {
    console.error("Error fetching like status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
