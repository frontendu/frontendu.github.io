#!/bin/bash

SITE_VERSION=`node -e "
	console.log(require('./package.json').version)
"`

npm run build:prod

git checkout master

mv $DIST_PATH/*
rmdir $DIST_PATH

git add -A

git commit -m "Version of site bumped to ${SITE_VERSION}"

git push origin master
