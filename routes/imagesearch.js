const APIKEY = process.env.MSDN_BING_SEARCH_KEY;


let express = require('express'),
    request = require('request'),
    router = express.Router();


router
    .route('/')
    .get((req, res) => {
        res.render('imagesearch');
    });

//  1. Make the request and if it has no errors
//  2. save into the db  
//  3.Sent it as json
router
    .route('/search/:query')
    .get((req, res) => {
        let query = req.params.query,
            offset = req.query.offset || 0,
            db = req.db,
            collection = req.db.collection('imagesearch'),
            options = {
                url: `https://api.cognitive.microsoft.com/bing/v5.0/images/search?offset=${offset}&q=${query}`,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Ocp-Apim-Subscription-Key": APIKEY 
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

// Looking through the DB with a projection to make it lighter
// !! -> Converts to boolean and makes boolean operations !![] === false, !![1, 2, 3] === true  
router
    .route('/latest')
    .get((req, res) => {
        let db = req.db,
            collection = req.db.collection('imagesearch');
        
        collection
            .find({},{_id: false})
            .toArray((err, docs) => {
                if(err) throw err;
                !!docs.length ? res.json(docs) : res.send('The DB has no entries yet');
            });
        
    }); 

module.exports = router;