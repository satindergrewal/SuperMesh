#!/bin/bash

clear

apt-get update
apt-get upgrade
apt-get clean all
shutdown -r now
