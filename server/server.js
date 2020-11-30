const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.argv[2], () => {
  console.log(`Server localhost listening on port ${process.argv[2]}`);
});
