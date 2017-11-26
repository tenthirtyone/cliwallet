'use strict';

const bcoin = require('bcoin');
const config = require('./config');
const readline = require('readline');
const fs = require('fs');

const WalletDB = bcoin.walletdb;
const keyring = bcoin.keyring;
let counter = 0;

bcoin.set(config.network);

const walletdb = new WalletDB({
  db: 'leveldb',
  network: config.network,
  location: process.env.HOME + '/wdb'
});

(async () => {
  await walletdb.open();

  let wallet = await walletdb.get(config.id);

  if (!wallet) {
    throw new Error('Wallet ' + config.id + ' not found');
  }

  console.log('Wallet ID: ' + wallet.id);

  const rl = readline.createInterface({
    input: fs.createReadStream('privateKeys.out')
  });

  rl.on('line', async (line) => {
    counter++;
    const key = keyring.fromSecret(line);

    if (counter % 100 === 0) {
      console.log(`Importing key #${counter}`);
    }

    try {
      await wallet.importKey(key);
    } catch (e) {
      console.log(e);
    }
  });

  rl.on('close', () => {
    console.log(`Imported ${counter} keys`);
  })

})().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
