const { FORBIDDEN_ERROR_CODE } = require('../utils/errorConstants');

class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.status = FORBIDDEN_ERROR_CODE; // 403
  }
}

module.exports = ForbiddenError;
