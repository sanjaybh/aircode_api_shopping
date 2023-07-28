// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const draw = require('./lib/gaobai');

module.exports = async function (params, context) {
  const {text, x, y, width, height} = params;
  context.set('content-type', 'image/png');
  return draw({
    text,
    x: Number(x),
    y: Number(y),
    width: Number(width),
    height: Number(height),
  });
};
