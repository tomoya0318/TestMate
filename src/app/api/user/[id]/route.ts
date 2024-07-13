import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/libs/server';
import { UserProps } from '@/types/user';

export default async function routeHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return handleGet(req, res);
  } else if (req.method === 'PUT') {
    return handlePut(req, res);
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = req.url ? new URL(req.url, 'http://localhost:3000') : null;
    const id = url?.pathname.split("/user/")[1];

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: "Error", err });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const url = req.url ? new URL(req.url, 'http://localhost:3000') : null;
  const id = url?.pathname.split("/user/")[1];
  
  try {
    const { name, introduce, image }: UserProps = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        image,
        introduce,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    let errorMessage = "Unknown error";
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    return res.status(500).json({ message: "Error", error: errorMessage });
  }
}
