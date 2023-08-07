const fs = require('node:fs');
const crypto = require('node:crypto');
const fetch = require('node-fetch');

function randomFileName(fileName) {
  const randomStr = Math.random().toString(36).slice(2);
  if(/\.([^.]+)$/.test(fileName)) {
    return fileName.replace(/\.([^.]+)$/, `-${randomStr}.$1`);
  }
  return `${fileName}-${randomStr}`;
}

function generateChecksum(str, algorithm = 'sha256', encoding = 'hex') {
    return crypto
        .createHash(algorithm)
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}

const accessKey = process.env.accessKey;
const storageZoneName = 'aircode-test';
const cdnDomain = 'https://aircode-yvo.b-cdn.net';
const region = 'la';
const dir = 'resource';

module.exports = async function uploadFile(buffer, filename) {
  filename = randomFileName(filename);
  if(filename.startsWith('-')) {
    filename = filename.slice(1);
  }
  const api = `https://${region}.storage.bunnycdn.com/${storageZoneName}/${dir}/${filename}`;
  const checksum = generateChecksum(buffer);
  const options = {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      AccessKey: accessKey,
      Checksum: checksum,
    },
    body: buffer,
  };
  const res = await fetch(api, options);
  const data = await res.json();
  if(data.HttpCode === 201) {
    data.url = `${cdnDomain}/${dir}/${filename}`
  }
  return data;
}