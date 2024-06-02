export class BielError extends Error {
  statusCode = 500;
  constructor(message = "Internal Server Error") {
    super(message);
    this.name = "BielError";
  }
}
