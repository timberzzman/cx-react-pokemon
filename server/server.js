const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/router');

const app = express();
const port = process.argv[2];

if (!port) {
  console.error('You need to give a port');
  process.exit(40);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Server localhost listening on port ${process.argv[2]}`);
});
