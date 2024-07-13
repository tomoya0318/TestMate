export type PostProps = {
  id: string;
  title: string;
  short: string;
  description: string;
  iconUrl: string;
  screenshots: string[];
  groupUrl: string;
  storeUrl: string;
  userId: string;
  likes: LikeProps[];
};

export type LikeProps = {
  id: string;
  userId: string;
  postId: string;
};
