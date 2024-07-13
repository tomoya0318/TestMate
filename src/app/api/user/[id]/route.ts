import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";
import { UserProps } from "@/types/user";

// ユーザー情報取得用API
export default async function handler(req: Request) {
  if (req.method === 'GET') {
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
  } else if (req.method === 'PUT') {
    const url = new URL(req.url);
    const id = url.pathname.split("/user/")[1];
    try {
      const { name, introduce, image }: UserProps = await req.json();
  
      if (!id || !name) {
        return NextResponse.json({ message: "Missing fields" }, { status: 400 });
      }
  
      const updatedUser = await prisma.user.update({
        data: {
          name,
          image,
          introduce,
        },
        where: { id },
      });
  
      return NextResponse.json(updatedUser);
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
  } else {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }
}
