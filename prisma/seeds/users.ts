import {User} from "@prisma/client";
export const users: User[] = [
  {
    id: "user1",
    name: "sample",
    email: "sample@gmail.com",
    emailVerified: null,
    introduce: null,
    image: "/initial_icon.png",
  }
]