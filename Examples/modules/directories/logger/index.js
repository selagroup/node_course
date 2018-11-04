const formatter = require('./dateFormat');
module.exports.log=function(msg){
    console.log(formatter.format(new Date(), "llll"),"==>",msg);
}
