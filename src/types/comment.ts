export type CommentProps = {
  id: string;
  content: string;
  postId: string;
  userId: string;
};

export type CommentAndUserImageProps = CommentProps & {
  user: {
    id: string,
    image: string
  }
}