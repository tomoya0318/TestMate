import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

//指定userの情報取得
export const GET = async (req: Request) => {
  try {
    
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ messege: "Error", err }, { status: 500 });
  }
};
