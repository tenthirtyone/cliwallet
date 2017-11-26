#!/bin/bash

awk 'NR > 5 { print }' < wallet.out  | cut -d ' ' -f 1 | head -n -2 > privateKeys.out
