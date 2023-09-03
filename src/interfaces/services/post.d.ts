export interface CreatePostPayload {
  userId: string;
  title: string;
  content: string;
}

export interface UpdatePostPayload {
  title?: string;
  content?: string;
  isPublished?: boolean;
}

interface PublishPostPayload {
  postId: string;
  title: string;
  content: string;
}
