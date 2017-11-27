const bcoin = require('bcoin');

let data = '02000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0401210101ffffffff0200f2052a0100000023210328ae1bf69ffa83366f2c28194eb1d9d02d61a02694018d21ac62075e5e5ba7ffac0000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf900000000'

let raw = Buffer.from(data, 'hex');

let tx = bcoin.primitives.TX.fromRaw(raw);
let mtx = bcoin.mtx.fromRaw(raw);


console.log(tx);
console.log('');
console.log(mtx);
