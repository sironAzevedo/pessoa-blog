const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'dist/index.html'));
});

const port = process.env.PORT || '8000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Console listening!'));