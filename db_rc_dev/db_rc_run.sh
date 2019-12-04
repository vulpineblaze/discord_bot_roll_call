#!/bin/sh

node main.js $1 2>&1 | tee dc_rc_bot_output.log

# in case of too many
# killall -9 phantomjs