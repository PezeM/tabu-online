export class InternalServerErrorException extends Error {
  constructor(message?: string | object | any, public error = 'Internal Server Error') {
    super(message);
  }
}
