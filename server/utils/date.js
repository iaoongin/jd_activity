const moment = require('moment');

module.exports.now = function(){
    return moment().format('YYYY-MM-DD HH:mm:ss')
}