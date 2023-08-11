import aircode from 'aircode';
import {config, context, modular} from 'http-modular';
import {sha256 as hash} from 'crypto-hash';

const auth = context(async (ctx) => {
  const origin = ctx.headers.origin;
  const referer = ctx.headers.referer;
  const xBucketId = ctx.headers['x-bucket-id'];

  if(origin !== 'https://code.devrank.cn') {
    throw new Error(JSON.stringify({error: {reason: '非法访问'}}));
  }
  
  if((!xBucketId && (!referer || !referer.includes('?projectId')))) {
    throw new Error(JSON.stringify({error: {reason: '缺少projectId，需要在HTML中添加<meta name="referrer" content="no-referrer-when-downgrade"/>，Safari浏览器请取“消阻止跨站跟踪选项”。'}}));
  }

  const bucket = await hash(xBucketId || (referer && referer.split('?projectId=')[1]));
  return aircode.db.table(`storage-${bucket}`)
});

const setItem = context(auth, async (table, key, value) => {
  return await table.where({key}).set({value}).upsert(true).save();
});

const getItem = context(auth, async (table, key) => {
  const res = await table.where({key}).findOne();
  return res?.value;
});

const removeItem = context(auth, async (table, key) => {
  return await table.where({key}).delete();
});

const clear = context(auth, async (table) => {
  return await table.drop();
});

export default modular({
  setItem,
  getItem,
  removeItem,
  clear,
}, config.aircode);