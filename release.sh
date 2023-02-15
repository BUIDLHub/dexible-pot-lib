#!/bin/sh

VERSION="1.0.14"

yarn version --new-version $VERSION;
yarn run build;
npm publish --access=public;
