const debug = require('debug')('yeps:wrapper');

module.exports = fn => async context => {
    debug(fn);
    context;
};
