export class InvalidHireableError extends Error {
  constructor(message = "Hireable must be a boolean value (true/false).") {
    super(message);
    this.name = "InvalidHireableError";
  }
}
