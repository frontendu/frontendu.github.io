#!/bin/bash

echo "Running deploy..."

SRC_URL='git@github.com:frontendu/frontendu.github.io'
NPM_VERSION=$1
TMP_PATH=.tmp
DIST_PATH=docs


if [ -z $NPM_VERSION ]; then
	NPM_VERSION='patch'
fi

echo "Incrementing version to ${NPM_VERSION}..."

SITE_VERSION=`npm version $NPM_VERSION -m "Version bumped to %s"`

echo "Pushing version and tags..."

git push origin dev -q
git push --tags -q

echo "Builing site..."

npm run build:prod -- --silent

echo "Prepare for publishing site..."

git clone $SRC_URL $TMP_PATH -q
pushd $TMP_PATH > /dev/null;
git checkout master -q
git rm -r ./ -q

echo "Copying new content of site..."

cp -r ../$DIST_PATH/* ./
git add -A

echo "Publishing site..."

git commit -m "Version of site bumped to ${SITE_VERSION}" -q || rm -rf $TMP_PATH

git push origin master -q

echo "Makeup cleaning up..."

popd > /dev/null

rm -rf $TMP_PATH
