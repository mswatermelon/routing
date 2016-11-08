const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send("Hello Express.js");
});

app.get('/hello', (req, res) => {
  res.status(200).send("Hello stranger !");
});

app.get('/hello/:name', (req, res) => {
  let name = req.params.name;

  res.status(200).send(`Hello, ${name}!`);
});

app.all('/sub/*', (req, res) => {
  let url = req.protocol + '://' + req.get('host') + req.originalUrl;

  res.send(`You requested URI: ${url}`);
});

let middleware = (req, res, next) => {
  let headerKey = req.get('Key');

  if (headerKey) next();
  else res.sendStatus(401);
}

app.post('/post', middleware, (req, res) => {
  let body = req.body;

  if (Object.keys(body).length !== 0) res.send(JSON.stringify(body));
  else res.status(400).send('Not Found');
});

app.listen(port);
