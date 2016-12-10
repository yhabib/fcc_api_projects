let express = require('express'),
    router = express.Router();


router
    .route('/')
    .get((req, res) => {
        let ip = req.ip,
            lan = req.get('accept-language'),
            os = req.get('user-agent');
        lan = lan ? lan.split(',')[0] : null;
        os = os ? os.slice(req.get('user-agent').indexOf('(') + 1, req.get('user-agent').indexOf(')')) : null;

        res.render('whoami', {ip: ip, lan: lan, os: os});
    });

module.exports = router;
