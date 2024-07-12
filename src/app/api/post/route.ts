import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

//ポストの全記事取得
export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ messege: "Error", err }, { status: 500 });
  }
};

// POSTへのお気に入り登録/解除用API
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

    if (existingLike) {
      // 既に「いいね」されている場合、「いいね」を解除
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      return NextResponse.json({ message: "Like removed" }, { status: 200 });
    } else {
      // まだ「いいね」されていない場合、新しく「いいね」を登録
      const like = await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
      return NextResponse.json(like, { status: 201 });
    }
  } catch (err) {
    console.error("Error creating/removing like:", err);

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
