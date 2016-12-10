let express = require('express'),
    router = express.Router(),
    helpers = require('./../helpers/helpers');

router
    .route('/')
    .get((req, res) => {
        res.render('minifurl');
    });

router
    .route('/all')
    .get((req, res) => {
        let db = req.db,
            collection = req.db.collection('minifurl');
        
        collection.find().toArray((err, doc) => {
            if(err) throw err;
            res.json(doc);
        });
    })


// Wildcard routing technique
// 1. Check if the url has a valid formate(regExp)
// 2. Generate uniqueKey
// 3. Save it into DB
// 4. Send it as json
router
    .route('/new/:url(*)')
    .get((req, res) => {                
        let url = req.params.url,
            db = req.db,
            collection = db.collection('minifurl');
        
        if(helpers.validUrl(url)) {
            let obj = {
                original_url: url,
                minify_url: helpers.generateHashKey(url)
            };
            
            collection.update( { original_url: obj.original_url }, obj, { upsert: true });
            res.json({
                original_url: obj.original_url,
                minify_url: `${req.protocol}://${req.headers.host}/minifurl/${obj.minify_url}`
            });
        }
        else
            res.send('The Url has a no valid format'); 
    });

router
    .route('/:url(*)')
    .get((req, res) => {        
        let url = req.params.url,
            db = req.db,
            collection = db.collection('minifurl');

        collection
            .find({ minify_url: url })
            .toArray((err, docs) => {              
                if(err) throw err;
                !!docs.length ? res.redirect(docs[0].original_url) : res.send("No entry in the DB founded");
            });
    });

module.exports = router;