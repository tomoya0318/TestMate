import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

// POSTへコメントを追加するAPI
export const POST = async (req: Request) => {
  try {
    const { content, postId, userId } = await req.json();

    // postIdとuserIdが存在することを確認
    if (!content || !postId || !userId) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // コメントをDBに追加
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    });

    return NextResponse.json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);

    // エラーメッセージの取得
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
