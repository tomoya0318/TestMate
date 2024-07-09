import { getSinglePost } from "@/api/get-single-post";

const PostDescription = async({ params }: {params: {id: number}}) => {
  const post = await getSinglePost(params.id);
  return (
    <>
      <div>{post.title}</div>
      <div>{post.description}</div>

    </>
  );
};

export default PostDescription;