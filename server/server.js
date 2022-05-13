const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

//app.use(express.static('build'));
app.use('/build', express.static(path.join(__dirname, '../build')));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

//app.get('*', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//app.get('/', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//})
//app.get('/*', (req, res) => {
  //res.setHeader('content-type', 'application/javascript');
  //res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//})

