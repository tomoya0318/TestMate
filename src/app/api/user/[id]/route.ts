import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { prisma } from '@/libs/server';
import { UserProps } from '@/types/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return handleGet(req, res);
  } else if (req.method === 'PUT') {
    return handlePut(req, res);
  } else {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = new URL(req.url || '', 'http://localhost:3000');
    const id = url.pathname.split("/user/")[1];

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url || '', 'http://localhost:3000');
  const id = url.pathname.split("/user/")[1];
  
  try {
    const { name, introduce, image }: UserProps = req.body;

    if (!id || !name) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        image,
        introduce,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    let errorMessage = "Unknown error";
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return NextResponse.json(
      { message: "Error", error: errorMessage },
      { status: 500 },
    );
  }
}
