#!/bin/bash

# Get temporary path
function get_tmp {
	echo ".`cat /dev/urandom | env LC_CTYPE=C tr -dc a-zA-Z0-9 | head -c 16`"
}

SRC_URL='git@github.com:frontendu/frontendu.github.io'
NPM_VERSION=$1
TMP_PATH=`get_tmp`
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

git clone $SRC_URL $TMP_PATH
cd $TMP_PATH;
git checkout master

git rm -r ./

cp -r ../$DIST_PATH/* ./
git add -A

git commit -m "Version of site bumped to ${SITE_VERSION}"

git push origin master

rm -rf
