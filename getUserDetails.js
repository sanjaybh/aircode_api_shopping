// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');

module.exports = async function (params, context) {
  console.log('Received params:', params);
  console.log('Received context:', context);
  
const TableXYZ = aircode.db.table("tableXYZ")
const result = await TableXYZ.save({ itemA: "Item A"});

return { result }
  return {
    message: `Hi, Samarth. ${params.appname} ${result}`,
  };
};
