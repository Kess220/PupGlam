import {
  InvalidInputError,
  NotFoundError,
  UserAlreadyLikedError,
  UserDidNotLikeError,
} from "../errors/index.js";
import * as PostRepository from "../repositories/postRepository.js";

export const createPost = async (image_url, description, dog_id) => {
  if (!image_url || !description || !dog_id) {
    throw new InvalidInputError(
      "Image URL, description, and dog ID are required"
    );
  }

  if (isNaN(Number(dog_id))) {
    throw new InvalidInputError("Dog ID must be a number");
  }

  const newPost = await PostRepository.createPost(
    image_url,
    description,
    dog_id
  );

  return newPost.rows[0];
};

export const getAllPosts = async () => {
  const posts = await PostRepository.getAllPosts();

  if (!posts) {
    throw new NotFoundError();
  }

  return posts.rows;
};

export const likePost = async (postId, userId) => {
  const existingPost = await PostRepository.getPostById(postId);

  if (existingPost.rows.length === 0) {
    throw new NotFoundError();
  }

  const existingLike = await PostRepository.getLikesCount(postId, userId);

  if (existingLike.rows[0].likes_count > 0) {
    throw new UserAlreadyLikedError();
  }

  await PostRepository.addLike(postId, userId);
  return { message: "Post liked successfully" };
};

export const unlikePost = async (postId, userId) => {
  const existingPost = await PostRepository.getPostById(postId);

  if (existingPost.rows.length === 0) {
    throw new NotFoundError();
  }
  const existingLike = await PostRepository.getLikesCount(postId, userId);

  if (existingLike.rows[0].likes_count === 0) {
    throw new UserDidNotLikeError();
  }

  await PostRepository.removeLike(postId, userId);

  return { message: "Post unliked successfully" };
};

export const getLikesCount = async (postId) => {
  const existingPost = await PostRepository.getPostById(postId);
  if (!existingPost || existingPost.rows.length === 0) {
    throw new NotFoundError("Post not found");
  }
  const result = await PostRepository.getLikesCount(postId);

  if (result.rows.length === 0) {
    throw new NotFoundError("Post not found");
  }

  const likesCount = result.rows[0].likes_count;
  const usersWhoLiked = result.rows[0].users_who_liked || [];

  return { likesCount, usersWhoLiked };
};

export const addCommentToPost = async (text, postId, userId) => {
  const existingPost = await PostRepository.getPostById(postId);
  if (!existingPost || existingPost.rows.length === 0) {
    throw new NotFoundError("Post not found");
  }

  const newComment = await PostRepository.addCommentToPost(
    text,
    postId,
    userId
  );
  return { message: "Comment added successfully", comment: newComment.rows[0] };
};

export const getCommentsByPostId = async (postId) => {
  const existingPost = await PostRepository.getPostById(postId);
  if (!existingPost || existingPost.rows.length === 0) {
    throw new NotFoundError("Post not found");
  }
  const comments = await PostRepository.getCommentsByPostId(postId);

  if (!comments) {
    throw new NotFoundError();
  }

  const formattedComments = comments.rows.map((comment) => ({
    id: comment.id,
    text: comment.text,
    created_at: comment.created_at,
  }));

  return { comments: formattedComments };
};
