export type CreatePostPayload = Pick<Post, "userId" | "content" | "title">;

export type UpdatePostPayload = {
  title?: string;
  content?: string;
  isPublished?: boolean;
};

export type PublishPostPayload = Pick<Post, "postId" | "content" | "title">;
