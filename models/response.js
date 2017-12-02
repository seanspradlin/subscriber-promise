/**
 * Wrapper for response
 */
class Response {
  /**
   * @param {object} body         Response body
   * @param {string} body.id      ID of origin message
   * @param {string} body.message Response message
   */
  constructor({ id, message }) {
    if (!id || typeof id !== 'string' || id.length !== 36) {
      throw new Error('id must be uuid');
    }
    this.id = id;
    this.message = `${message}`;
  }
}

module.exports = Response;

