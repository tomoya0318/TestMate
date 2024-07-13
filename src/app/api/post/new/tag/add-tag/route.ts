import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

// POSTへのタグ登録API
export const POST = async (req: Request) => {
  try {
    const { appType, category, status, postId } = await req.json();

    // postIdとuserIdが存在することを確認
    if (!appType || !category || !status || !postId) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // 新しいタグをTagsテーブルに登録
    const newTag = await prisma.tags.create({
      data: {
        appType,
        category,
        status,
      },
    });

    // TagsテーブルのIDを取得し、PostTagsテーブルに保存
    const postTag = await prisma.postTags.create({
      data: {
        postId,
        tagId: newTag.id,
      },
    });

    return NextResponse.json(postTag);
  } catch (error) {
    console.error("Error fetching like status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
};
