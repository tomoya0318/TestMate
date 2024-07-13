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
