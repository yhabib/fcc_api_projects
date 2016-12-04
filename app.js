var express = require('express'),
    path = require('path'),
    pug = require('pug'),
    home = require('./routes/home'),
    timestampt = require('./routes/timestampt'),
    whoami = require('./routes/whoami'),
    minifurl = require('./routes/minifurl'),
    app = express(); 

app.use(express.static('public'))
   .set('views', path.join(__dirname, 'public/views'))
   .set('view engine', 'pug')
   .use('/', home)
   .use('/timestampt', timestampt)
   .use('/whoami', whoami)
   .use('/minifurl', minifurl);

module.exports = app;