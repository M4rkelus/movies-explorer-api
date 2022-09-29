const { UNAUTHORIZED_ERROR_CODE } = require('../utils/errorConstants');

class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.status = UNAUTHORIZED_ERROR_CODE; // 401
  }
}

module.exports = UnauthorizedError;
