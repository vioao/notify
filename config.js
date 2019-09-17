const nconf = require('nconf');

const filepath = nconf.env().get("configfile") || nconf.argv().get("configfile")
    || './config.json';
console.log("Use config file: " + filepath);
nconf.argv().file({file: filepath}).env();

module.exports = nconf;