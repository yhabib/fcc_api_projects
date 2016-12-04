var express = require('express'),
    mongo = require('mongodb').MongoClient,
    mongoUrl = "mongodb://localhost:27017/minifurl",
    router = express.Router();

router
    .route('/')
    .get((req, res) => {
        res.render('minifurl');
    });

// wildcard routing technique
router
    .route('/*')
    .get((req, res) => {        
        var url = req.params[0];
            
        if(!isNormalUrl(url)) {
            mongo.connect(mongoUrl, (err, db) => {
                if(err) throw err;
                db.collection('urls')
                    .find(
                        {minify_url: url}
                    )
                    .toArray((err, document) => {
                        if(err) throw err;
                        else  
                            document[0] ? 
                                res.redirect(document[0].original_url) :
                                res.json({error: "The url is not in the DB"});

                        db.close();
                    });
            });
        }

        else {
            var doc = {
                original_url: url,
                minify_url: shortUrl(url)
            };

            mongo.connect(mongoUrl, (err, db) => {
                if(err) throw err;

                db.collection('urls')
                .aggregate(
                    { $project: {original_url: 1, minify_url: 1, _id: 0}},
                    { $match: {original_url: doc.original_url}}
                )
                .toArray((err, documents) => {
                    if(err) throw err;
                    if(documents.length === 0)
                        db.collection('urls').insert(doc);
                    else    
                        res.json(documents[0]);

                    db.close();
                });
            });
        }
    });

// 1. Split the url and take the server part
// 2. Three first characters
// 3. Plus random_numer
// 4. www.google.es -> goo_21
function shortUrl(url) {
    var code = url.split('.')[1].slice(0,3),
        random = Math.floor(Math.random() * 1000);

    return `${code}_${random}`;
}

// Returns true if the url has one of the key words
function isNormalUrl(url) {
    const keys = ["www", "http", "https"];

    return keys.some(key => url.indexOf(key) > -1 );
} 
module.exports = router;