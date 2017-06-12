#!/bin/bash

NPM_VERSION=$1

if [ -z $NPM_VERSION ]; then
	NPM_VERSION='patch'
fi

npm version $NPM_VERSION -m "Version bumped to %s"

git push origin dev
git push --tags

SITE_VERSION=`node -e "
	console.log(require('package.json').version)
"`

npm run build:prod

git checkout master

mv docs/*
rmdir docs/

git add -A

git commit -m "Bumped to version ${SITE_VERSION} of Github Pages"

git push origin master
