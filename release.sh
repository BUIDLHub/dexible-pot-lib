#!/bin/sh

VERSION="1.0.0"

yarn version --new-version $VERSION;
yarn run build;
yarn run do_publish;
