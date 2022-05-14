const express = require('express');
const path = require('path');
const enforce = require('express-sslify');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../build/')));

if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
  app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
  })
}

app.listen(port, err => {
  if (err) throw err;
  console.log(`Server is up on port ${port}`);
});
