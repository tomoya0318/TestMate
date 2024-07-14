import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

// 自分がlikeしたpostを表示するAPI
export const GET = async (req: Request) => {
  try {
    const urlParts = req.url.split("/user/");
    if (urlParts.length < 2) {
      return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
    }

    const userIdPart = urlParts[1].split("/like-posts");
    if (userIdPart.length < 1) {
      return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
    }

    const userId = userIdPart[0];

    // userIdが存在することを確認
    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    // likeテーブルからuserIdに基づいてpostIdを取得
    const likedPosts = await prisma.like.findMany({
      where: {
        userId: userId,
      },
      select: {
        postId: true,
      },
    });

    // likedPostsが存在しない場合の処理
    if (likedPosts.length === 0) {
      return NextResponse.json({ message: "No liked posts found" }, { status: 404 });
    }

    // postIdに基づいてpostのデータを取得
    const postIds = likedPosts.map((like) => like.postId);
    const posts = await prisma.post.findMany({
      where: {
        id: { in: postIds },
      },
    });
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  }
};
