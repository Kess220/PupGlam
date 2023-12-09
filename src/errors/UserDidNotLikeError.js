export class UserDidNotLikeError extends Error {
  constructor(message = "User did not like this post") {
    super(message);
    this.name = "UserDidNotLikeError";
  }
}
