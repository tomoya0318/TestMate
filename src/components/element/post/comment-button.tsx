import React, { useState, useEffect } from "react";
import { IconButton, HStack, Text } from "@chakra-ui/react";
import { countComment } from "@/api/count-comment";
import { useSession, signIn } from "next-auth/react";
import { FaRegComment } from "react-icons/fa";

type CommentButtonProps = {
  postId: string;
};

const CommentButton: React.FC<CommentButtonProps> = ({ postId }) => {
  const { data: session } = useSession();
  const [commentCount, setCommentCount] = useState<number>(0);

  useEffect(() => {
    const fetchCommentData = async () => {
      const count = await countComment(postId);
      setCommentCount(count);
    };

    fetchCommentData();
  }, [postId]);

  const handleCommentClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (!session || !session.user?.id) {
      signIn(); // サインインしていない場合はサインイン画面にリダイレクト
      return;
    } else {
      // サインイン済みのユーザーのコメントアクションのロジックを追加
    }
  };

  return (
    <HStack>
      <IconButton
        icon={<FaRegComment />}
        onClick={handleCommentClick}
        aria-label="Comment"
        isDisabled={!session} // サインインしていない場合はボタンを無効にする
      />
      <Text>{commentCount}</Text>
    </HStack>
  );
};

export default CommentButton;
