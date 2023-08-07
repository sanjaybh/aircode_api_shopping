// @see https://docs.aircode.io/guide/functions/
const {parse} = require('node:url');
const path = require('node:path');
const {db, files} = require('aircode');
const uploadFile = require('./lib/bunny-api'); 

const qiniu = require('qiniu');
const fetch = require('node-fetch');

const serviceURL = 'https://ap-gate-z0.qiniuapi.com/voice/v2/tts';

module.exports = async (params, context) => {
  const table = db.table('audios');
  const {spkid, content} = params;
  
  const body = JSON.stringify({spkid, content});

  const cached = await table.where({body}).findOne();
  if(cached) {
    return {code: "0", result: {audioUrl: cached.url}, msg: "from cache"};
  }

  const mac = {accessKey: process.env.AK, secretKey: process.env.SK};
  
  const authToken = qiniu.util.generateAccessTokenV2(mac, serviceURL, 'POST', 'application/json', body);

  const res = await (await fetch(serviceURL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': authToken,
    },
    body,
  })).json();

  if(res.code === "0") {
    let url = res.result.audioUrl;
    const buffer = await (await fetch(url)).arrayBuffer();

    const {url:uploadUrl} = await uploadFile(Buffer.from(buffer), 'audio.mp3');

    // const filename = path.basename(parse(url).pathname);
    // const file = await files.upload({ url }, filename, {
    //   additions: {
    //     body,
    //   }
    // });
    // url = file.url;

    if(url) {
      res.result.audioUrl = uploadUrl;
      await table.save({body, url: uploadUrl});
    }
  }
  
  return res;
};
