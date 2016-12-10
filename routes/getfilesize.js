var express = require('express'),
    multer = require('multer'),
    router = express.Router(),
    upload = multer({ });

router
    .route('/')
    .get((req, res) => {
        res.render('getfilesize');
    })
    .post(upload.single('load'), (req, res) => {
        let name = req.file.originalname.split('.');
        name = name.splice(0, name.length - 1).join('.');
        res.render('getfilesize', {name: name, size: +req.file.size / 1000, format: req.file.mimetype})
    });


module.exports = router;