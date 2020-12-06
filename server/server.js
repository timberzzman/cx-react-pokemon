const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./src/router');

const app = express();
const port = process.argv[2];

if (!port) {
  console.error('You need to give a port');
  process.exit(0);
}

app.use(cors());
app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => {
  console.log(`Server localhost listening on port ${port}`);
});
