#!/usr/bin/env bash
# fail if any commands fails
set -e
# debug log
set -x

####
# FIX error sed: can't read s,^

sed_cmd='sed -i '
if [[ "$OSTYPE" == "linux-gnu" ]]; then
        # Linux
        sed_cmd='sed -i '
elif [[ "$OSTYPE" == "darwin"* ]]; then
        # Mac OSX
        sed_cmd='sed -i "" '
fi
#
####

cp .env.example .env
$sed_cmd "s,^API_URL=,API_URL=$API_URL," .env
$sed_cmd "s,^STRIPE_PUBLISHABLE_KEY=,STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY," .env
$sed_cmd "s,^STRIPE_SECRET_KEY=,STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY," .env

