export class NotFoundError extends Error {
  constructor(message = "No item found with the provided identifier.") {
    super(message);
    this.name = "NotFoundError";
  }
}
