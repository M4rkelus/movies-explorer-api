class BadRequestError extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.status = 400;
  }
}

module.exports = BadRequestError;
