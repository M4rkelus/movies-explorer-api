const { BAD_REQUEST_ERROR_CODE } = require('../utils/errorConstants');

class BadRequestError extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.status = BAD_REQUEST_ERROR_CODE; // 400
  }
}

module.exports = BadRequestError;
