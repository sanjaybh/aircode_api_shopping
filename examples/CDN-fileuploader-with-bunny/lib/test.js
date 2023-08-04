// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const uploadFile = require('./bunny-api'); 

module.exports = async function (params, context) {
  console.log('Received params:', params);
  const res = await uploadFile('abc', 'text.txt');
  console.log(res);
  return {
    message: 'Hi, AirCode.',
  };
};
