const { EventEmitter } = require('events');
const { Message, Response } = require('./models');

/**
 * Mock Emitter used to replicate a messaging broker like Kafka
 */
class Emitter extends EventEmitter {
  /**
   * Push a message into the broker
   * @param {Message} message
   * @returns void
   */
  push(message) {
    if (!(message instanceof Message)) {
      throw new Error('must be a message');
    }

    setTimeout(() => {
      const response = new Response({
        id: message.id,
        message: 'pong',
      });
      this.emit('response', response);
    }, 1000);
  }
}

module.exports = Emitter;

