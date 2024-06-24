const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const server = https.createServer({
  cert: fs.readFileSync(`${path.resolve()}/src/security/cert.pem`),
  key: fs.readFileSync(`${path.resolve()}/src/security/key.pem`)
}, app);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (_, res) { 
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => { console.log(`Listening to port ${PORT}`) });
