const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('build'));

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

app.get('*', (req, res) => {
  res.contentType('application/javascript')
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

