#!/bin/bash

echo "How to call: ./build.sh [install]"
cd /home/powerpiper/api
if [ "$1" = "install" ]
then
  npm install
fi

npm run build
pm2 delete ppApi
pm2 start npm --name "ppApi" -- start
