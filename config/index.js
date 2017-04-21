var configValues = require('./config.json');

module.exports = {
    dbConnectionLink: function(){
        return 'mongodb://' + configValues.username + ':'+ configValues.password + '@ds163060.mlab.com:63060/crm';
    }
}
