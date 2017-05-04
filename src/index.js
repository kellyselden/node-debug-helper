const execArgv = require('yargs-parser')(process.execArgv);
module.exports = require('./_index')(execArgv);
