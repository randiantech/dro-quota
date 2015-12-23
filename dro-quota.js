var cfg = require("../../lib/plugin.js").cfg;
var timer = null;
var total = 0;

/**
 * HTTP quota limit plugin for Dromedary library.
 * Sets quota limit for HTTP apps
 * @param req the HTTP request
 * @param res the HTTP response
 * @param cb the callback function
 */
function plugin(req, res, cb) {
    var _ = cfg(req);
    var time = parseInt(_['time']);
    var limit = parseInt(_['limit']);

    if(!timer){
        setInterval(function(){
            timer = null;
        }, time);
    }

    if(total <= limit) {
        cb();
    } else {
        cb("Quota surpassed");
    }
}

/**
 * Public Inteface
 * @type {{plugin:plugin}}
 */
module.exports = {
    plugin: plugin
};
