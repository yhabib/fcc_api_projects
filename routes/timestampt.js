var express = require('express'),
    path = require('path')
    router = express.Router(),
    monthNames = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
    ];

router
    .route('/')
    .get((req, res) => {
        res.render('timestampt');
    });

router
    .route('/:timestamp')
    .get((req, res) => {
        const ts = req.params.timestamp,
              date = ts.match(/^\d*$/) ? new Date(Number(ts)) : new Date(ts);
        
        if(!isNaN(date)) 
            res.json({natural: `${monthNames[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`, unix: date.getTime()});
        else
            res.json({natural: null, unix: null});
    });


module.exports = router;
