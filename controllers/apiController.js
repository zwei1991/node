var mongoose = require('mongoose');
var Drivers = require('../models/driversModel');
var bodyParser = require('body-parser');

module.exports = function(app, passport) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //get all drivers
    app.get('/api/drivers',isLoggedIn, function(req, res){
        Drivers.find({}, function(err, data){
            if (err) throw err;
            res.send(data);
        });
    });

    //get single driver by nric
    app.get('/api/driver/:nric', function(req, res){
        Drivers.find({nric: req.params.nric}, function(err, data){
            if (err) throw err;
            res.send(data);
        })
    })

    //create or update driver
    app.post('/api/drivers', function(req, res){
        //if nric 
        Drivers.find({nric: req.body.nric}, function(err, data){
            if(data.length){
                Drivers.findOneAndUpdate({nric: req.body.nric}, {
                    gender: req.body.gender,
                    dob: req.body.dob,
                    email: req.body.email,
                    address: req.body.address
                }, function(err, success){
                    if (err) throw err;
                    Drivers.find({nric: req.body.nric}, function(err, data){
                        res.send(data);
                    });
                });
            } else {
                var newDriver = Drivers({
                    nric: req.body.nric,
                    gender: req.body.gender,
                    dob: req.body.dob,
                    email: req.body.email,
                    address: req.body.address
                });
                newDriver.save(function(err, success){
                    if(err) throw err;
                    res.send('new driver added');
                });      
            }//end of else
        });
        
    }) // end of post

    app.delete('/api/drivers', function(req, res){
        Drivers.findOneAndRemove({nric: req.body.nric}, function(err, success){
            if(err) throw err;
            res.send('driver successfully deleted');
        })
    });// end of delete
    
}
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}