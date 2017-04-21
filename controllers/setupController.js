var Drivers = require('../models/driversModel');
var seedData = require('../seeddata').seedData;

module.exports = function (app) {
    app.get('/api/setup', function(req, res){

        Drivers.create(seedData, function(err, result){
            res.send(result);
        })
    })
}