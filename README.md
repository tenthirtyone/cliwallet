git clone
npm install

regtest:
start bitcoin-qt in regtest mode
start bcoin with node: 127.0.0.1:20000 - Your regtest node (fullnode.js).

In bitcoin-qt console: generate some blocks. Stay around 20-30 while bcoin is a peer. High numbers can stall the client

optionally, keypoolrefill a large number of keys

The bcoin terminal will sync blocks as they generate.

Mongo will create the cliwallet db.

In the bitcoin-qt console: dumpwallet /home/username/wallet.out - Will take some time if you have a large number of keys.

Manually trim the first and last lines from the wallet.out file leaving the key:addr pairs

./exportBitcoindKeys.sh will parse out the private keys into privateKeys.out

run node createWallet.js to create wallet.json - a key:addr array

run node get UTXOs.js to pull UTXOs from mongo. This creates utxos.json

run node createTx.js to create the raw tx