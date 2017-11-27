'use strict';

const bcoin = require('bcoin');
const FullNode = bcoin.fullnode;

const node = new FullNode({
  network: 'regtest',
  dbname: 'cliwallet',
  dbhost: 'localhost',
  checkpoints: true,
  workers: true,
  logLevel: 'info',
  'max-inbound': 8,
  'max-outbound': 8,
  'http-port': 8332,
  nodes: '127.0.0.1:20000'
});

(async () => {
  await node.open();
  await node.connect();

  node.startSync();
})().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
