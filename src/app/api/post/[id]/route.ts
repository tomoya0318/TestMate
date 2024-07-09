import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

//ブログ詳細記事取得API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/post/")[1]);
    const post = await prisma.post.findFirst({ where: { id } });
    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ messege: "Error", err }, { status: 500 });
  }
};
