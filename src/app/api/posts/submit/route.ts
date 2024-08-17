import { NextResponse } from "next/server";
import { prisma } from "@/libs/server";
import { CreatePost } from "@/types/posts";

// POST新規作成用API
export const POST = async (req: Request) => {
  try {
    const data: CreatePost = await req.json();
    
    const isMissingFields = Object.values(data).some(value => value === undefined || value === null || value === '');
    if (isMissingFields) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }
    const {tag, ...postData} = data;

    const post = await prisma.post.create({
      data: {
        ...postData,
        tags: {
          create: {
            tag: {
              create: {
                ...tag,
              },
            },
          },
        },
      },
    });
    
    return NextResponse.json(post.id);
  } catch (err) {
    console.error("Error creating post with tags:", err);
    return NextResponse.json({ messege: 'Error', err }, { status: 500 });
  }
};
