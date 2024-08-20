import { Post, Like, Comment, Tester, Tag } from "@prisma/client";

export interface DisplayPost extends Post {
  likes: Like[];
  comments: Comment[];
  testers: Tester[];
}

export interface CreatePost
  extends Omit<Post, "id" | "createdAt" | "updatedAt">,
    Omit<Tag, "id"> {}
