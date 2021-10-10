#!/bin/bash

for b in book1 book2 book3 book4 book5; do
  echo "$b"
  cd $b

  bin="../_bin/bin"
  rm *.json

  for i in `cat contents`; do
    ${bin}/prep -b $b $i
  done

  cd ..
done

