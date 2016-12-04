var crypto = require('crypto'),
    helpers;

helpers = {
    validUrl: function(url){
        var re = /(http:\/\/|https:\/\/)[a-z0-9\-]+[.]\w+/;
        return url.match(re) !== null ? true : false;
    },
    generateHashKey: function(url) {
        var key = crypto.createHash('md5').update(url).digest("base64").slice(0, 4);
        return url.split('.')[1].slice(0,3) + '_' + key;
    }
}

module.exports = helpers;