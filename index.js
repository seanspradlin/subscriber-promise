const express = require('express');
const bodyParser = require('body-parser');
const Emitter = require('./mock-emitter');
const Client = require('./client');
const { Message } = require('./models');

const emitter = new Emitter();
const client = new Client(emitter);
const app = express();

app.use(bodyParser.json());

app.post('/', (req, res) => {
  if (!req.body.message) {
    res.json({ error: 'message required' });
  } else {
    client.send(new Message(req.body.message))
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        res.json(error);
      });
  }
});

app.listen(8080);

