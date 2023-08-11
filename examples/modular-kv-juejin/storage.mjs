import aircode from 'aircode';
import {config, modular} from 'http-modular';
import {sha256 as hash} from 'crypto-hash';

function auth(context) {
  const origin = context.headers.origin;
  const referer = context.headers.referer;
  const xBucketId = context.headers['x-bucket-id'];

  if(origin !== 'https://code.devrank.cn') {
    throw new Error(JSON.stringify({error: {reason: '非法访问'}}));
  }
  
  if((!xBucketId && (!referer || !referer.includes('?projectId')))) {
    throw new Error(JSON.stringify({error: {reason: '缺少projectId，需要在HTML中添加<meta name="referrer" content="no-referrer-when-downgrade"/>，Safari浏览器请取“消阻止跨站跟踪选项”。'}}));
  }

  const bucket = hash(xBucketId || (referer && referer.split('?projectId=')[1]));
  return aircode.db.table(`storage-${bucket}`)
}

async function setItem(key, value, context) {
  return await auth(context).where({key}).set({value}).upsert(true).save();
}

async function getItem(key, context) {
  const res = await auth(context).where({key}).findOne();
  return res?.value;
}

async function removeItem(key, context) {
  return await auth(context).where({key}).delete();
}

async function clear(context) {
  return await auth(context).drop();
}

export default modular({
  setItem,
  getItem,
  removeItem,
  clear,
}, config.aircode);