import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";
import { UserProps } from "@/types/user";

// user情報編集用API
export const PUT = async (req: Request) => {
  try {
    const { id, name, introduce, image }: UserProps = await req.json();

    if (!id || !name) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const users = await prisma.user.update({
      data: {
        name,
        image,
        introduce
      },
      where: { id }
    });

    return NextResponse.json(users);
  } catch (err) {
    // エラーオブジェクトが`unknown`型であるため、型ガードを使用してエラーメッセージを取り出す
    let errorMessage = "Unknown error";
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return NextResponse.json(
      { message: "Error", error: errorMessage },
      { status: 500 }
    );
  }
};

export const config = {
  api: {
    bodyParser: true,
  },
};
