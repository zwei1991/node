var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs')

var usersSchema = new Schema({
    local: {
        email: String,
        password: String
    }
});

//generate hash for password
usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//check password
usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

var Users = mongoose.model('Users', usersSchema);

module.exports = Users;