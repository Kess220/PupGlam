import httpStatus from "http-status";
import * as PostService from "../services/postService.js";

export const createPost = async (req, res) => {
  const { image_url, description, dog_id } = req.body;
  await PostService.createPost(
    image_url,
    description,
    Number(dog_id),
    req.user.userId
  );
  res.status(httpStatus.CREATED).send({ message: "Post created successfully" });
};

export const getAllPosts = async (req, res) => {
  const result = await PostService.getAllPosts();

  return res.status(httpStatus.OK).send({ posts: result });
};

export const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.userId;

  const result = await PostService.likePost(postId, userId);

  return res.status(httpStatus.OK).send(result);
};

export const unlikePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.userId;
  const result = await PostService.unlikePost(postId, userId);
  return res.status(httpStatus.OK).send(result);
};

export const getLikesCount = async (req, res) => {
  const { postId } = req.params;
  const result = await PostService.getLikesCount(postId);

  return res.status(httpStatus.OK).send(result);
};

export const addComment = async (req, res) => {
  const { text } = req.body;
  const postId = req.params.postId;
  const userId = req.user.userId;

  const result = await PostService.addCommentToPost(text, postId, userId);

  return res
    .status(httpStatus.CREATED)
    .send({ message: result.message, comment: result.comment });
};

export const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  const result = await PostService.getCommentsByPostId(postId);

  return res.status(httpStatus.OK).send({ comments: result.comments });
};
