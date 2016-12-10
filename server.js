const MONGOUSERPSW = process.env.MONGO_USER_PSW;

/********************************************************************************
    -- PACKAGES --
********************************************************************************/
let express = require('express'),
    pug = require('pug'),
    path = require('path'),
    mongodb = require('mongodb');
    
/********************************************************************************
    -- ROUTES --
********************************************************************************/
let home = require('./routes/home'),
    timestamp = require('./routes/timestamp'),
    whoami = require('./routes/whoami'),
    minifurl = require('./routes/minifurl'),
    imagesearch = require('./routes/imagesearch'),
    getfilesize = require('./routes/getfilesize');

/********************************************************************************
    -- INIT --
********************************************************************************/
let mongo = mongodb.MongoClient,
    url = `mongodb://${MONGOUSERPSW}@ds119748.mlab.com:19748/fcc_api_projects`,
    app = express();          

/********************************************************************************
    -- APP --
********************************************************************************/

mongo.connect(url, (err, db) => {
    if(err) 
        throw err;
    else {
        console.log( 'Success: Connected to DB' );
        app.use((req, res, next) => {
            req.db = db;
            next();
        })
        app.use('/', home)
           .use('/timestamp', timestamp)
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