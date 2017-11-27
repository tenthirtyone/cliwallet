'use strict';

const bcoin = require('bcoin');
const config = require('./config');

const WalletDB = bcoin.walletdb;
const keyring = bcoin.keyring;
let counter = 0;

bcoin.set(config.network);

const walletdb = new WalletDB({
  db: 'leveldb',
  network: config.network,
  location: process.env.HOME + '/wdb'
});

let data = '02000000010000000000000000000000000000000000000000000000000000000000000000ffffffff03530101ffffffff0200f2052a01000000232102af1756063326210f22aa8e706f6fcf5b4f9e93e1c11bacac2d0049637f692301ac0000000000000000266a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf900000000'

let raw = Buffer.from(data, 'hex');

let tx = bcoin.primitives.TX.fromRaw(raw);

(async () => {
  await walletdb.open();

  let wallet = await walletdb.get(config.id);

  if (!wallet) {
    throw new Error('Wallet ' + config.id + ' not found');
  }

  console.log('Wallet ID: ' + wallet.id);


  console.log(tx);
  await walletdb.addTX(tx);
  console.log('adding tx');

  let pendingTx = await wallet.getPending()

  pendingTx.forEach(record => {
    record.tx.outputs.forEach(output => {
      console.log(output)
      console.log(output.toRaw().toString('hex'))
    })
  })

  wallet.on('balance', (balance) => {
    console.log('Balance updated.');
    console.log(bcoin.amount.btc(balance.unconfirmed));
  });

})().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
