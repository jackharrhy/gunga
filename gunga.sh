#!/usr/bin/env sh

while read token; do
  echo "GUNGA"
  TOKEN=$token node gunga.js &
done < tokens
