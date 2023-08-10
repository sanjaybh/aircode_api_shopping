// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {getRecordsByTag, getRecordsCount} = require('./model/favorite.js');
const checkAuth = require('./lib/auth.js');

module.exports = async function (params, context) {
  const auth = checkAuth(context);
  if(auth) return auth;

  const {method, headers} = context;

  if(method === 'GET' || headers['x-cicada-action'] === 'get') {
    const {tag} = params;
    if(!tag) {
      context.status(400);
      return {
        error: 'invalid tag',
      };
    }
    const page = Number(params.page) || 1;
    return await getRecordsByTag({tag, page});
  } else {
    context.status(403);
    return {
      error: 'forbidden',
    };
  }
};
