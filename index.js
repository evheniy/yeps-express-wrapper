const debug = require('debug')('yeps:wrapper');

module.exports = fn => async (context) => {
  debug('Wrapper created');
  return new Promise((resolve, reject) => {
    context.res.on('finish', () => {
      debug('Response finished');
      reject();
    });
    fn(context.req, context.res, (error) => {
      debug(error);
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
