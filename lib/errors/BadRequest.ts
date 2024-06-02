import { BielError } from "./BielError";

export class BadRequest extends BielError {
  statusCode = 400;
  constructor(message = "Requisição inválida") {
    super(message);
    this.name = "BadRequest";
  }
}
