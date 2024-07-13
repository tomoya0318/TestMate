import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

// POST新規作成用API
export const POST = async (req: Request) => {
  try {
    const {
      title,
      short,
      description,
      iconUrl,
      screenshots,
      groupUrl,
      storeUrl,
      userId,
    } = await req.json();

    if (
      !userId ||
      !title ||
      !short ||
      !description ||
      !iconUrl ||
      !screenshots ||
      !groupUrl ||
      !storeUrl
    ) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        short,
        description,
        iconUrl,
        screenshots,
        groupUrl,
        storeUrl,
        userId,
      },
    });

    return NextResponse.json(post);
  } catch (err) {
    // エラーオブジェクトが`unknown`型であるため、型ガードを使用してエラーメッセージを取り出す
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
