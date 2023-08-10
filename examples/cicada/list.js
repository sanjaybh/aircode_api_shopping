// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {getRecords, saveRecord} = require('./model/favorite.js');
const checkAuth = require('./lib/auth.js');

module.exports = async function (params, context) {
  const auth = checkAuth(context);
  if(auth) return auth;

  const {method, headers} = context;

  if(method === 'GET' || headers['x-cicada-action'] === 'get') {
    const page = Number(params.page) || 1;
    let result = await getRecords({page});
    if(result.total <= 0) {
        await saveRecord({
          title: 'AirCode',
          url: 'https://aircode.io/',
          summary: `AirCode is an online platform designed to streamline the development and deployment of Node.js applications, tailored for full-stack engineers. With an intuitive in-browser IDE and pre-configured cloud services, AirCode takes care of the backend technology selection, environment setup, and operation, so you can focus on building great products. No more complex setup processes, no more headaches over server management - open your browser, and you're ready to go.`,
          tags: ['faas'],
        });
        result = await getRecords({page});
    }
    return result;
  } else {
    context.status(403);
    return {
      error: 'forbidden',
    };
  }
};
