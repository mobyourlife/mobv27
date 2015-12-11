#!/bin/sh

 docker run --name mobv27-html -v `pwd`/deploy/fansite:/usr/share/nginx/html:ro -d nginx@1.9.8
 
