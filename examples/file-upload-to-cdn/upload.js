// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const uglifyJS = require("uglify-js");
const uploadFile = require('./lib/bunny-api'); 

module.exports = async function (params, context) {
  // console.log('Received params:', params);
	const {myFile, token, minify} = params;
	if(token !== process.env.token) {
		context.status(403);
		return {
			error: 403,
			message: 'invalid token',
		};
	}

	let buffer = myFile.buffer;
	if(minify) {
		const source = buffer.toString();
		const result = uglifyJS.minify(source);
		buffer = Buffer.from(result.code);
	}

	const res = await uploadFile(buffer, myFile.name);

  return {
    ...res,
		name: myFile.name,
		minify,
  };
};
