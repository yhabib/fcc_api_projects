var express = require('express'),
    request = require('request'),
    router = express.Router(),
    apiKey = process.env.MSDN_BING_SEARCH_KEY;

router
    .route('/')
    .get((req, res) => {
        res.render('imagesearch');
    });

router
    .route('/search/:query')
    .get((req, res) => {
        var query = req.params.query,
            offset = req.query.offset || 0,
            db = req.db,
            collection = req.db.collection('imagesearch'),
            options = {
                url: `https://api.cognitive.microsoft.com/bing/v5.0/images/search?offset=${offset}&q=${query}`,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Ocp-Apim-Subscription-Key": apiKey 
                }
            };
            
            request(options, (err, response, body) => {
                if(err) throw err;
                collection
                    .insert({term: query, when: new Date().toDateString()}, (err, record) => {
                        if(err) throw err;
                        console.log("Document correctly inserted into the DB");
                    });
                res.json(JSON.parse(body));
            });
    });

router
    .route('/latest')
    .get((req, res) => {
        var db = req.db,
            collection = req.db.collection('imagesearch');
        
        collection
            .find({},{_id: false})
            .toArray((err, docs) => {
                if(err) throw err;
                if(docs.length === 0)  res.send('The DB has no entries yet');
                else res.json(docs);
            });
        
    }); 

module.exports = router;