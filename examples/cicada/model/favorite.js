// @see https://docs.aircode.io/guide/functions/
const {db} = require('aircode');
const {PAGE_SIZE} = require('../lib/config.js');

const recordTable = db.table('records');

async function getRecordsCount(cond = {}, extra = null) {
  let total = recordTable.where(cond);
  if(extra) total = total.or(extra);
  total = await total.count();
  const pageCount = Math.ceil(total / PAGE_SIZE);
  return {total, pageCount};
}

async function saveRecord({title, url, summary = '', tags = []}) {
  await recordTable.where({url}).delete();
  return recordTable.save({title, url, summary, tags});
}

async function deleteRecord({id}) {
  return await recordTable.where({_id: id}).delete();
}

async function getRecords({page = 1, pageSize = PAGE_SIZE} = {}) {
  const result = await recordTable.where()
    .sort({updatedAt: 'DESC'})
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .find();

  const {total, pageCount} = await getRecordsCount();
  return {result, page, total, pageCount};
}

async function getRecordByUrl({url}) {
  return await recordTable.where({url}).findOne();
}

async function getRecordsByTag({tag = '', page = 1, pageSize = PAGE_SIZE} = {}) {
  if(!tag) return await getRecords();
  const condition = {
      tags: db.in(tag.split(',')),
    };
  
  const result = await recordTable.where(condition)
    .sort({updatedAt: 'DESC'})
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .find();

  const {total, pageCount} = await getRecordsCount(condition);
  return {result, page, total, pageCount};
}

async function searchRecords({keywords = '', page, pageSize = PAGE_SIZE}) {
  if(!keywords) return await getRecords();
  
  keywords = new RegExp(keywords.split(/\s+/g).join('|'), 'ig');

  const condition = {
    title: keywords
  };
  
  const result = await recordTable.where(condition)
    .or({summary: keywords})
    .or({url: keywords})
    .sort({updatedAt: 'DESC'})
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .find();

  const {total, pageCount} = await getRecordsCount(condition, [{summary: keywords}, {url: keywords}]);
  return {result, page, total, pageCount};
}

module.exports = {
  saveRecord,
  getRecords,
  getRecordsByTag,
  getRecordByUrl,
  deleteRecord,
  searchRecords,
}
