import { Post as PrismaPost, Like, Comment, Tester } from "@prisma/client";

export interface Post extends PrismaPost {
  likes: Like[];
  comments: Comment[];
  testers: Tester[];
}