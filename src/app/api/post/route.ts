import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

export type TagProps = {
  appType?: string,
  category?: string,
  status?: string
};

//ポストの全記事取得
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const appType = searchParams.get("appType");
    const category = searchParams.get("category");
    const status = searchParams.get("status");

    let posts;
    if (appType || category || status) {
      posts = await prisma.post.findMany({
        where: {
          tags: {
            some: {
              OR: [
                appType ? { tag: { appType: appType } } : {},
                category ? { tag: { category: category } } : {},
                status ? { tag: { status: status } } : {},
              ],
            },
          },
        },
        include: {
          tags: true,
        },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          tags: true,
        },
      });
    }

    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
