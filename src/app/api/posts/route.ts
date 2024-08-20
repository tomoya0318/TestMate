import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/server";
import { DisplayPost } from "@/types/posts";

//ポストの全記事取得
export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams
    const app_type = params.get("app_type") || undefined;
    const category = params.get("category") || undefined;
    const public_status = params.get("public_status") || undefined;
    console.log(app_type);
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
    const filteredPosts: DisplayPost[] = posts.map(({likes, comments, testers, ...post}) => {
      return {
        ...post,
        likes: likes.filter(like => like.postId === post.id),
        comments: comments.filter(comment => comment.postId === post.id),
        testers: testers.filter(tester => tester.postId === post.id)
      }
    })
    return NextResponse.json(filteredPosts);
  } catch (err) {
    console.error("Error getting post:", err);
    return NextResponse.json({ messege: "Sever Error" }, { status: 500 });
  }
};