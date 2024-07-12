import React from "react";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
const FormPost = dynamic(() => import("./_components/form-post"));

const PostNewPage: React.FC = async () => {
  return (
    <SessionProvider>
      <FormPost />
    </SessionProvider>
  );
};

export default PostNewPage;
