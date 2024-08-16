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
    return NextResponse.json({ messege: 'Error', err }, { status: 500 });
  }
};
