export class IsNotANumber extends Error {
  constructor(message = "The field must be a number") {
    super(message);
    this.name = "IsNotANumber";
  }
}
