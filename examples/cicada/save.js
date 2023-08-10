// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {saveRecord} = require('./model/favorite.js');
const checkAuth = require('./lib/auth.js');

module.exports = async function (params, context) {
  const auth = checkAuth(context);
  if(auth) return auth;

  const {method} = context;

  if(method === 'POST') {
    const {title, url, summary, tags} = params;
    if(!title || !url) {
      context.status(400);
      return {
        error: 'invalid record',
      };
    }
    return await saveRecord({title, url, summary, tags});
  } else {
    context.status(403);
    return {
      error: 'forbidden',
    };
  }
};
