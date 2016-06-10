#!/bin/bash

OUTPUT="$(ls -1)"
echo "${OUTPUT}"

DIR="$(echo $1"1" | tail -c 5)"
echo $DIR
MAKEDIR="/mnt/$DIR"

sudo mkdir -p $MAKEDIR

sudo mount /dev/$DIR /mnt/$DIR

#ls -lh /mnt/
#df -h