#!/bin/sh

rm -rf deploy
NODE_ENV=production gulp release
cp -r dist deploy