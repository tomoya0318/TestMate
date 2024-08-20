import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

// 自分がしたpostを表示するAPI
export const GET = async (req: Request) => {
  try {
    const userId = await req.url.split("/user/")[1].split("/my-posts")[0];

    // userIdが存在することを確認
    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    // postテーブルからuserIdに基づいて投稿を取得
    const posts = await prisma.post.findMany({
      where: {
        userId: userId,
      },
    });

    // postsが存在しない場合の処理
    if (posts.length === 0) {
      return NextResponse.json({ message: "No posts found" }, { status: 404 });
    }

    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ messege: "Error", err }, { status: 500 });
  }
};
