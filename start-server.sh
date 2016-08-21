#!/bin/sh

docker rm -f mobv27-html

docker run --name mobv27-html --restart=always -v `pwd`/deploy/fansite:/usr/share/nginx/html:ro -d nginx@1.9.8
 
