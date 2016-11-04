#!/bin/bash

set -o errexit
set -o pipefail

apt-get update
apt-get upgrade -y
apt-get install -y libav-tools
