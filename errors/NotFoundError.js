const { NOT_FOUND_ERROR_CODE } = require('../utils/errorConstants');

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.status = NOT_FOUND_ERROR_CODE; // 404
  }
}

module.exports = NotFoundError;
