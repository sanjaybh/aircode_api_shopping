// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {searchRecords, getRecordsByTag} = require('./model/favorite.js');
const checkAuth = require('./lib/auth.js');

module.exports = async function (params, context) {
  const auth = checkAuth(context);
  if(auth) return auth;

  const {method, headers} = context;
  
  if(method === 'GET' || headers['x-cicada-action'] === 'get') {
    const {keywords} = params;
    const page = Number(params.page) || 1;

    if(!keywords) {
      context.status(400);
      return {
        error: 'invalid keywords',
      };
    } else if(/^tag:/.test(keywords)) {
      const tag = keywords.slice(4);
      return await getRecordsByTag({tag, page});
    }
    return await searchRecords({keywords, page});
  } else {
    context.status(403);
    return {
      error: 'forbidden',
    };
  }
};
