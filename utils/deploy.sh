#!/bin/bash

NPM_VERSION=$1
DIST_PATH=docs

if [ -z $NPM_VERSION ]; then
	NPM_VERSION='patch'
fi

npm version $NPM_VERSION -m "Version bumped to %s"

git push origin dev
git push --tags

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
