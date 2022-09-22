class NotFoundError extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.status = 404;
  }
}

module.exports = NotFoundError;
