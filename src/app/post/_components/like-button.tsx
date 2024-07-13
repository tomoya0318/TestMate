import React, { useState, useEffect } from "react";
import { IconButton, HStack, Text } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toggleLike } from "@/api/toggle-like";
import { checkLike } from "@/api/check-like";
import { countLike } from "@/api/count-like";
import { useSession, signIn } from "next-auth/react";

type LikeButtonProps = {
  postId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId }) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    const fetchLikeData = async () => {
      if (session && session.user?.id) {
        const liked = await checkLike(postId, session.user.id);
        setIsLiked(liked);

        const count = await countLike(postId);
        setLikeCount(count);
      }
    };

    if (session) {
      fetchLikeData();
    }
  }, [session, postId]);

  const handleLikeClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (!session || !session.user?.id) {
      signIn(); // サインインしていない場合はサインイン画面にリダイレクト
      return;
    }

    // Optimistically update the UI
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    const response = await toggleLike(postId, session.user.id);
    if (response.liked !== undefined) {
      setIsLiked(response.liked);
      setLikeCount(response.liked ? likeCount + 1 : likeCount - 1);
    }
  };

  return (
    <HStack>
      <IconButton
        icon={isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
        onClick={handleLikeClick}
        aria-label="Like"
      />
      <Text>{likeCount}</Text>
    </HStack>
  );
};

export default LikeButton;
