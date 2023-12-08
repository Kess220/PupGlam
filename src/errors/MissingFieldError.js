export class MissingFieldError extends Error {
  constructor(message = "All fields must be filled") {
    super(message);
    this.name = "MissingFieldError";
  }
}
