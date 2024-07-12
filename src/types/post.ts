export type PostProps = {
  id: string;
  title: string | undefined;
  description: string | undefined;
  userId: string;
  likes: LikeProps[];
};

export type LikeProps = {
  id: string,
  userId: string,
  postId: string
}
