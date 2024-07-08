'use client';
import { getAllPost } from "@/api/get-all-post";
import { PostProps } from "@/types/post";
const Postpage = async() => {
  const Posts: PostProps[] = await getAllPost();
  return (
    <>
      {Posts.map((post: PostProps) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <div>{post.description}</div>
        </div>
      ))}
    </>
  );
};

export default Postpage;
