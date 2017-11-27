'use strict';

const fs = require('fs');
const bitcore = require('bitcore-lib');

let wallet;
let utxos;
let addrFilter = {};

loadWallet();

function loadWallet() {
  fs.readFile('./wallet.json', (err, data) => {
    if (err) {
      throw new Error(err);
    }

    let json;
    try {
      json = JSON.parse(data)
    } catch (e) {
      throw new Error(e);
    }

    wallet = json.wallet || [];
    loadUTXOs();
  });
}

function loadUTXOs() {
  fs.readFile('./utxos.json', (err, data) => {
    if (err) {
      throw new Error(err);
    }

    let json;
    try {
      json = JSON.parse(data)
    } catch (e) {
      throw new Error(e);
    }

    utxos = json.utxos || [];

    console.log(wallet.length)
    console.log(utxos.length)
    //createTX();
    filterAddrs();
    createTX();
  });
}

// Without this it will try every key. Filter to keys that match
// addrs
function filterAddrs() {
  utxos.forEach(utxo => {
    addrFilter[utxo.address] = true;
  })
}

function createTX() {
  const privKeys = [];
  wallet.forEach(key => {
    if (addrFilter[key.address]) {
      let privKey = bitcore.PrivateKey.fromWIF(key.wif);
      privKeys.push(privKey);
    }
  });

  let total = utxos.reduce((a, b) => {
    return a + b.satoshis;
  }, 0)

  const tx = new bitcore.Transaction();
  tx.from(utxos);
  tx.to('mfXzcLXsHBys6Uq8ZsbZwdT2KotVDzeNcK', total);
  tx.sign(privKeys);
  console.log('Raw Tx:');
  console.log(tx.toString('hex'))

}