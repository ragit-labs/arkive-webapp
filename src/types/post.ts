export type IPostMetadata = {
  author?: string;
};

export type Tag = {
  name: string;
};

export type IPost = {
  id: string;
  title: string;
  content: string;
  url: string;
  banner: string;
  timestamp: string;
  extra_metadata?: IPostMetadata;
  tags: Tag[];
  user_id: string;
};
