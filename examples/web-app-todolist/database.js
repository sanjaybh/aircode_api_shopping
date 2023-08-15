// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {db} = aircode;

async function getTasks() {
  const table = db.table('todolist');
  const lists = await table.where({state: db.lt(2)}).sort({state: 'asc', updatedAt: 'desc'}).find();
  return lists;
}

async function addTask({text, state = 0}) {
  const table = db.table('todolist');
  const result = await table.save({text, state});
  return result;
}

async function updateTask({id, state}) {
  const table = db.table('todolist');
  const result = await table.where({_id:id}).findOne();
  result.state = state;
  await table.save(result);
  return result;
}

module.exports = {getTasks, addTask, updateTask};