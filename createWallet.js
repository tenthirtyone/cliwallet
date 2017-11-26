'use strict';

const bcoin = require('bcoin');
const config = require('./config');

const WalletDB = bcoin.walletdb;
const keyring  = bcoin.keyring;

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
    wallet = await walletdb.create(config);
    console.log('Wallet created')
  }

  console.log('Wallet ID: ' + wallet.id);
  console.log('Wallet network: ' + wallet.network);

})().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
