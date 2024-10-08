import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";
import { UserProps } from "@/types/user";

//userの情報取得
export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/user/")[1];

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

// user情報編集用API
export const PUT = async (req: Request) => {
  const url = new URL(req.url);
  const id = url.pathname.split("/user/")[1];
  try {
    const { name, introduce, image }: UserProps = await req.json();

    if (!id || !name) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const users = await prisma.user.update({
      data: {
        name,
        image,
        introduce,
      },
      where: { id },
    });

    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ messege: "Error", err }, { status: 500 });
  }
};
