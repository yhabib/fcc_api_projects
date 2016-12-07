var express = require('express'),
    path = require('path'),
    pug = require('pug'),
    mongo = require('mongodb').MongoClient,
    mongoUserPsw = process.env.MONGO_USER_PSW,
    url = `mongodb://${mongoUserPsw}@ds119748.mlab.com:19748/fcc_api_projects`;
    home = require('./routes/home'),
    timestampt = require('./routes/timestampt'),
    whoami = require('./routes/whoami'),
    minifurl = require('./routes/minifurl'),
    imagesearch = require('./routes/imagesearch'),
    getfilesize = require('./routes/getfilesize'),
    app = express(); 
    

    mongo.connect(url, (err, db) => {
        if(err) 
            throw err;
        else {
            console.log( 'Success: Connected to DB' );
            app.use((req, res, next) => {
                req.db = db;
                next();
            })
               .use('/', home)
               .use('/timestampt', timestampt)
               .use('/whoami', whoami)
               .use('/minifurl', minifurl)
               .use('/imagesearch', imagesearch)
               .use('/getfilesize', getfilesize);
        }
    });

app.use(express.static('public'))
   .set('views', path.join(__dirname, 'public/views'))
   .set('view engine', 'pug');


module.exports = app;