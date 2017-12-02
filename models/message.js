const uuidv4 = require('uuid/v4');

/**
 * Message wrapper with UUID
 */
class Message {
  /**
   * @param {string} text String message to be sent
   */
  constructor(text) {
    if (!text) {
      throw new Error('Text must be be provided');
    }

    this.text = `${text}`;
    this.id = uuidv4();
  }
}

module.exports = Message;

