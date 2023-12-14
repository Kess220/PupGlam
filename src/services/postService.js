import {
  InvalidInputError,
  NotFoundError,
  UserAlreadyLikedError,
  UserDidNotLikeError,
} from "../errors/index.js";
import * as PostRepository from "../repositories/postRepository.js";

export const createPost = async (imageUrl, description, dogId) => {
  if (!imageUrl || !description || !dogId) {
    throw new InvalidInputError(
      "Image URL, description, and dog ID are required"
    );
  }

  if (Number.isNaN(Number(dogId))) {
    throw new InvalidInputError("Dog ID must be a number");
  }

  const newPost = await PostRepository.createPost(imageUrl, description, dogId);

  return newPost.rows[0];
};

export const getAllPosts = async () => {
  const posts = await PostRepository.getAllPosts();

  if (!posts) {
    throw new NotFoundError("Post not found");
  }

  return posts.rows;
};

export const likePost = async (postId, userId) => {
  const existingPost = await PostRepository.getPostById(postId);

  if (!existingPost || existingPost.rows.length === 0) {
    throw new NotFoundError("Post not found");
  }

  const existingLike = await PostRepository.getLikesCount(postId);

  if (!existingLike || existingLike.likesCount > 0) {
    throw new UserAlreadyLikedError();
  }

  await PostRepository.addLike(postId, userId);
  return { message: "Post liked successfully" };
};

export const unlikePost = async (postId, userId) => {
  const existingPost = await PostRepository.getPostById(postId);

  if (existingPost.rows.length === 0) {
    throw new NotFoundError("Post not found");
  }
  const existingLike = await PostRepository.getLikesCount(postId, userId);

  if (existingLike.rows[0].likesCount === 0) {
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

  const { likesCount, usersWhoLiked } = await PostRepository.getLikesCount(
    postId
  );

  return {
    likesCount,
    usersWhoLiked,
  };
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
    throw new NotFoundError("Comments not found");
  }

  const formattedComments = comments.rows.map((comment) => ({
    id: comment.id,
    text: comment.text,
    createdAt: comment.createdAt,
  }));

  return { comments: formattedComments };
};
