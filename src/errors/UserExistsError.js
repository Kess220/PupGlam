class UserExistsError extends Error {
  constructor(message = "Email is already in use") {
    super(message);
    this.name = "UserExistsError";
  }
}

export { UserExistsError };
