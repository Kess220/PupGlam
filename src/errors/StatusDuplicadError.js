export class StatusDuplicadError extends Error {
  constructor(message) {
    super(message);
    this.name = "StatusDuplicadError";
  }
}
