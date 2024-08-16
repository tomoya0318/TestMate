import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/server";

export type TagProps = {
  appType?: string;
  category?: string;
  status?: string;
};
//ポストの全記事取得
export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams
    const app_type = params.get("app_type") || ""
    const category = params.get("category") || ""
    const public_status = params.get("public_status") || ""
    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            tag: {
              appType: app_type,
              category: category,
              publicStatus: public_status,
            },
          },
        },
      },
      include:{
        likes: true,
        comments: true,
        testers: true,
      }
    });
    const filteredPosts = posts.map(({likes, comments, testers, ...post}) => {
      return {
        ...post,
        like: likes.filter(like => like.postId === post.id),
        comment: comments.filter(comment => comment.postId === post.id),
        tester: testers.filter(tester => tester.postId === post.id)
      }
    })
    return NextResponse.json(filteredPosts);
  } catch (err) {
    return NextResponse.json({ messege: "Error", err }, { status: 500 });
  }
};