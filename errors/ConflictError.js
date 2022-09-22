class ConflictError extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.status = 409;
  }
}

module.exports = ConflictError;
