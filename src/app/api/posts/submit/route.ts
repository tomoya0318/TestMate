import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

// POST新規作成用API
export const POST = async (req: Request) => {
  try {
    const data = await req.json();

    const { appType, category, publicStatus, ...postData } = data;
    // 必要なフィールドが存在しない場合に400エラーを返す
    const requiredPosts = [
      "userId",
      "title",
      "short",
      "description",
      "iconUrl",
      "screenshots",
      "groupUrl",
      "storeUrl",
    ];

    const isMissingPosts = requiredPosts.some(
      (field) => !postData[field] || postData[field] === "",
    );

    if (isMissingPosts || !appType || !category || !publicStatus) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // トランザクションを使用
    const post = await prisma.$transaction(async (tx) => {
      return await tx.post.create({
        data: {
          ...postData,
          tags: {
            create: {
              tag: {
                create: {
                  appType,
                  category,
                  publicStatus,
                },
              },
            },
          },
        },
      });
    });

    return NextResponse.json(post.id);
  } catch (err) {
    console.error("Error creating post:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};
