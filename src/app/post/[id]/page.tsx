import { getSinglePost } from "@/api/get-single-post";
import { Box, Flex, Text } from "@chakra-ui/react";

const PostDescription = async ({ params }: { params: { id: number } }) => {
  const post = await getSinglePost(params.id);
  return (
    <>
      <div>{post.title}</div>
      <div>{post.description}</div>
    </>
  );
};

export default PostDescription;
