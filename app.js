var express = require('express'),
    path = require('path'),
    pug = require('pug'),
    home = require('./routes/home'),
    timestampt = require('./routes/timestampt'),
    whoami = require('./routes/whoami'),
    app = express(); 

app.use(express.static('public'))
   .set('views', path.join(__dirname, 'public/views'))
   .set('view engine', 'pug')
   .use('/', home)
   .use('/timestampt', timestampt)
   .use('/whoami', whoami);

module.exports = app;