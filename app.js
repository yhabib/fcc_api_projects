var express = require('express'),
    path = require('path'),
    home = require('./routes/home'),
    timestampt = require('./routes/timestampt'),
    pug = require('pug'),
    app = express(); 

app.use(express.static('public'))
   .set('views', path.join(__dirname, 'public/views'))
   .set('view engine', 'pug')
   .use('/', home)
   .use('/timestampt', timestampt);

module.exports = app;