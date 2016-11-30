var express = require('express'),
    path = require('path')
    router = express.Router();

router
    .route('/')
    .get((req, res) => {
        res.render('timestampt');
    });

router
    .route('/:timestamp')
    .get((req, res) => {
        res.send(req.params.timestamp);
    });


module.exports = router;
