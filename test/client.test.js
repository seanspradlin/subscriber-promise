const { assert } = require('chai');
const Promise = require('bluebird');
const Client = require('../client');
const Emitter = require('../mock-emitter');
const { Message, Response } = require('../models');

describe('client', () => {
  it('should be a function', () => {
    assert.isFunction(Client);
  });

  describe('send', () => {
    it('should expose a send method', () => {
      assert.isFunction(Client.prototype.send);
    });

    it('should return a promise', () => {
      const emitter = new Emitter();
      const client = new Client(emitter);
      const message = new Message('hello');
      const promise = client.send(message);
      assert.instanceOf(promise, Promise);
    });

    it('should accept a Message format', (done) => {
      const emitter = new Emitter();
      const client = new Client(emitter);
      const message = new Message('hello');
      client.send(message)
        .then(() => {
          done();
        })
        .catch(error => done(error));
    });

    it('should reject non-Messages', (done) => {
      const emitter = new Emitter();
      const client = new Client(emitter);
      client.send({ message: 'Hello' })
        .then(() => done(new Error('should not resolve')))
        .catch(() => {
          done();
        });
    });

    it('should resolve errors instead of throwing them in-line', (done) => {
      const emitter = new Emitter();
      const client = new Client(emitter);
      client.send()
        .then(() => done(new Error('should not resolve')))
        .catch(() => {
          done();
        });
    });

    it('should return a message', (done) => {
      const emitter = new Emitter();
      const client = new Client(emitter);
      const message = new Message('hello');
      client.send(message)
        .then((response) => {
          assert.instanceOf(response, Response);
          done();
        })
        .catch(error => done(error));
    });
  });
});

