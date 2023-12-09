export class UserAlreadyLikedError extends Error {
  constructor(message = "User already liked this post") {
    super(message);
    this.name = "UserAlreadyLikedError";
  }
}
