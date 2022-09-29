const { CONFLICT_ERROR_CODE } = require('../utils/errorConstants');

class ConflictError extends Error {
  constructor(message) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.status = CONFLICT_ERROR_CODE; // 409
  }
}

module.exports = ConflictError;
