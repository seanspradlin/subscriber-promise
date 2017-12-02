const { assert } = require('chai');
const Emitter = require('../mock-emitter');
const { Message } = require('../models');

describe('mock-emitter', () => {
  it('should be a function', () => {
    assert.isFunction(Emitter);
  });

  describe('push', () => {
    it('should be a function', () => {
      assert.isFunction(Emitter.prototype.push);
    });

    it('should only accept messages', () => {
      const emitter = new Emitter();

      assert.throws(() => {
        emitter.push('garbage message');
      });
    });

    it('should return void', () => {
      const emitter = new Emitter();
      const message = new Message('ping');
      const response = emitter.push(message);
      assert.isUndefined(response);
    });
  });

  it('should emit a response after a second', (done) => {
    const emitter = new Emitter();
    const message = new Message('ping');

    emitter.on('response', () => done());

    emitter.push(message);
  });
});

