var express = require('express'),
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
        var db = req.db,
            collection = req.db.collection('minifurl');
        
        collection.find().toArray((err, doc) => {
            if(err) throw err;
            res.json(doc);
        });
    })

// wildcard routing technique
router
    .route('/new/:url(*)')
    .get((req, res) => {                
        var url = req.params.url,
            db = req.db,
            collection = db.collection('minifurl');
        
        if(helpers.validUrl(url)) {
            var obj = {
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
        var url = req.params.url,
            db = req.db,
            collection = db.collection('minifurl');

        collection
            .find({ minify_url: url })
            .toArray((err, docs) => {              
                if(err) throw err;
                if(docs.length === 0) res.send("No entry in the DB founded");
                else res.redirect(docs[0].original_url); 
            });
    });

module.exports = router;