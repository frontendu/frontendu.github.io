#!/bin/bash

# Get temporary path
function get_tmp {
	echo ".`cat /dev/urandom | env LC_CTYPE=C tr -dc a-z0-9 | head -c 16`"
}

echo "Running deploy..."

SRC_URL='git@github.com:frontendu/frontendu.github.io'
NPM_VERSION=$1
TMP_PATH=`get_tmp`
DIST_PATH=docs

if [ -z $NPM_VERSION ]; then
	NPM_VERSION='patch'
fi

echo "Incrementing version to ${NPM_VERSION}..."

npm version $NPM_VERSION -m "Version bumped to %s"

echo "Pushing version and tags..."

git push origin dev -q
git push --tags -q

SITE_VERSION=`node -e "
	console.log(require('./package.json').version)
"`

echo "Builing site..."

npm run build:prod -- --silent

echo "Prepare for publishing site..."

git clone $SRC_URL $TMP_PATH -q
cd $TMP_PATH > /dev/null;
git checkout master -q
git rm -r ./ -q

echo "Copying new content of site..."

cp -r ../$DIST_PATH/* ./
git add -A -q

echo "Publishing site..."

git commit -m "Version of site bumped to ${SITE_VERSION}" || rm -rf $TMP_PATH

git push origin master -q

rm -rf $TMP_PATH
