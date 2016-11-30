var express = require('express'),
    router = express.Router();


router
    .route('/')
    .get((req, res) => {
        let ip = req.get('host'),
            lan = req.get('accept-language'),
            os = req.get('user-agent');
        if(lan) lan = lan.split(',')[0];
        if(os) os = os.slice(req.get('user-agent').indexOf('(') + 1, req.get('user-agent').indexOf(')'))

        res.render('whoami', {ip: ip, lan: lan, os: os});
    });

module.exports = router;
