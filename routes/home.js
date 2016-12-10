let express = require('express'),
    router = express.Router();


router
    .route('/')
    .get((req, res) => res.render('index', {hostname: req.headers.host}));

module.exports = router;
