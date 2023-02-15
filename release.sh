#!/bin/sh

VERSION="1.0.13"

yarn version --new-version $VERSION;
yarn run build;
npm publish --access=public;
