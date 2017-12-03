const Promise = require('bluebird');
const { EventEmitter } = require('events');
const { Message } = require('./models');

/**
 * Wrapper for a message broker to send/receive messages
 */
class Client {
  /**
   * @param {EventEmitter} emitter Wrapper of event emitter
   * @param {object}       options
   * @param {number}       ttl     Lifespan of a message in miliseconds
   */
  constructor(emitter, options) {
    // Normally, we would test against the emitter wrapper since it adds push
    // functionality, but making a base class for both the mock emitter and real
    // emitter is too much boilerplate for a demo
    if (!(emitter instanceof EventEmitter)) {
      throw new Error('emitter must implement EventEmitter');
    }
    this.emitter = emitter;
    this.store = {};

    if (options) {
      // eslint-disable-next-line no-bitwise
      this.ttl = options.ttl | 0 || 10000;
    } else {
      this.ttl = 10000;
    }

    this.emitter.on('response', (response) => {
      if (this.store[response.id]) {
        clearTimeout(this.store[response.id].timeout);
        this.store[response.id].resolve(response);
        delete this.store[response.id];
      }
    });
  }

  /**
   * Send a message through the broker
   * @param {Message} message
   * @returns Promise<Response> response
   */
  send(message) {
    if (!(message instanceof Message)) {
      return Promise.reject(new Error('message must be a Message'));
    }
    this.emitter.push(message);

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('response timed out'));
        delete this.store[message.id];
      }, this.ttl);
      this.store[message.id] = { resolve, timeout };
    });
  }
}

module.exports = Client;

