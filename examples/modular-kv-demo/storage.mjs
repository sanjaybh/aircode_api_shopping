import aircode from 'aircode';
import {config, context, modular} from 'http-modular';
import {sha1 as hash} from 'crypto-hash';

const auth = context(async (ctx) => {
  const origin = ctx.headers.origin;
  const referer = ctx.headers.referer;
  const xBucketId = ctx.headers['x-bucket-id'];

  if(!/\.csb\.app$/.test(origin)) {
    throw new Error(JSON.stringify({error: {reason: 'illegal access'}}));
  }
  
  if(!xBucketId && !referer) {
    throw new Error(JSON.stringify({error: {reason: 'The projectId is missing. You need to add<meta name="referrer" content="no referrer when downtrade"/>to the HTML. For Safari browser, please select the "Unblock Cross Site Tracking Option".'}}));
  }

  const bucket = await hash(xBucketId || referer);
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