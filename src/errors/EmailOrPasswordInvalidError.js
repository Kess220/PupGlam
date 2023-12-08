class EmailOrPasswordInvalidError extends Error {
  constructor(message = "Email or Password invalid") {
    super(message);
    this.name = "EmailOrPasswordInvalidError";
  }
}

export { EmailOrPasswordInvalidError };
