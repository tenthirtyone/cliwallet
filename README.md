In Bitcoin-qt dumpwallet to file, name the file 'wallet.out' and move to this directory.

Manually trim the first five and last two lines of the file so it is only the keys.

bash exportBitcoindKeys.sh will create privateKeys.out. This file is one privKey per line.

Set wallet name and network in config. If regtest, use testnet for network.

node createWallet.js will create a new wallet.
node importKeys.js will import the privateKeys.out file.
node walletInfo.js will show the addresses / count for the wallet.