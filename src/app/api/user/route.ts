import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

//指定userの情報取得
export const POST = async (req: Request) => {
  try {
    const { id } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    // ユーザー情報が存在しない場合のエラーハンドリング
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
