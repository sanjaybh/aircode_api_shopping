// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const checkAuth = require('./lib/auth.js');

module.exports = async function (params, context) {
  const {token} = params;
  const auth = checkAuth({
    headers: {'x-cicada-token': token},
    status: (state) => context.status(state),
  });
  if(auth) return auth;
  else return {error:'', reason: 'success', token};
};
