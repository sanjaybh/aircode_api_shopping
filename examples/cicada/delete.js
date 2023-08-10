// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {deleteRecord} = require('./model/favorite.js');
const checkAuth = require('./lib/auth.js');

module.exports = async function (params, context) {
  const auth = checkAuth(context);
  if(auth) return auth;

  const {method} = context;

  if(method === 'POST') {
    const {id} = params;
    if(!id) {
      context.status(400);
      return {
        error: 'invalid record',
      };
    }
    return await deleteRecord({id});
  } else {
    context.status(403);
    return {
      error: 'forbidden',
    };
  }
};
