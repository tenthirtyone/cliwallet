'use strict';

const readline = require('readline');
const fs       = require('fs');
const bitcore  = require('bitcore-lib');
const wallet = [];

let counter = 0;

const rl = readline.createInterface({
  input: fs.createReadStream('privateKeys.out')
});

// Each line is a WIF key
rl.on('line', async (line) => {
  counter++;

  let key = bitcore.PrivateKey.fromWIF(line);
  let addr = key.toAddress();

  let data = {
    privKey: key.toString('hex'),
    wif: line,
    addr: addr.toString()
  }

  wallet.push(data)

  if (counter % 100 === 0) {
    console.log(`Importing key #${counter}`);
  }
  //console.log(data)
});

rl.on('close', () => {
  console.log(`Imported ${counter} keys`);

  console.log('Writing wallet.json');
  fs.writeFile("./wallet.json", JSON.stringify({wallet: wallet}), (err) => {
    if (err) {
      throw new Error(err);
    }
    console.log('Finished writing wallet.json');
  })
})
