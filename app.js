var express = require('express'),
    app = express();

app.get('/', (req, res) => {
    res.send('OK');
});

module.exports = app;