let express = require('express'),
    router = express.Router();

const MONTHS = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
    ];

router
    .route('/')
    .get((req, res) => {
        res.render('timestamp');
    });

router
    .route('/:timestamp')
    .get((req, res) => {
        let ts = req.params.timestamp,
            date = ts.match(/^\d*$/) ? new Date(+ts) : new Date(ts); // +ts returns a number
        
        isNaN(date) ? res.json({natural: null, unix: null}) :
                      res.json({natural: `${MONTHS[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`, unix: date.getTime()});
    });


module.exports = router;
