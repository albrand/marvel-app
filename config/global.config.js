const md5 = require('md5');

const publicKey = '<<publickey>>';
const privateKey = '<<privatekey>>';
const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);
const baseUrl = 'http://gateway.marvel.com/v1/public';

module.exports = { publicKey, hash, ts, baseUrl };