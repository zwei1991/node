var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var driversSchema = new Schema({
    name: String,
    nric: String,
    gender: String,
    dob: String,
    email: String,
    address: String,
    contracts: String
});

var Drivers = mongoose.model('Drivers', driversSchema);

module.exports = Drivers;