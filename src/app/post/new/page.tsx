import React from "react";
import { FormPost } from "./_components/form-post";
import { SessionProvider } from "next-auth/react";

const PostNewPage: React.FC = async () => {
  return (
    <SessionProvider>
      <FormPost />
    </SessionProvider>
  );
};

export default PostNewPage;
