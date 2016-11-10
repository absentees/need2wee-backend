#!/bin/bash

set -o errexit
set -o pipefail

apt-get update
apt-get upgrade -y
apt-get install -y libav-tools
# Dont think i need these
# apt-get install -y alsa-utils libasound2-dev

cd /usr/bin/
ln -s avconv ffmpeg
cd ~

# Recent node now installs dependencies before running preinstall scripts :(
npm install speaker@~0.2.6

# turn sound down
# amixer sset 'PCM' 65%
