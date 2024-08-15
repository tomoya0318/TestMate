import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";

export type TagProps = {
  appType?: string;
  category?: string;
  status?: string;
};
//ポストの全記事取得
export const GET = async () => {
  try {
    const posts = await prisma.post.findMany({
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

// ポストのタグが一致した記事取得
export const POST = async (req: Request) => {
  try {
    const { appType, category, status }: TagProps = await req.json();

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
    }
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
