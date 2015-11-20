#!/bin/bash

# This example code disabled. Used only for testing purposes by reading input.
#getinfo()
#{
#  read -p "Enter the IP of your router:          (looks like 192.168.1.1)   " routerip
#  read -p "Enter the netmask for your network:   (looks like 255.255.255.0) " netmask
#  read -p "Enter the ip address for your server: (looks like 192.168.1.22)  " staticip
#}

writeinterfacefile()
{ 
cat << EOF > $1
#### - IMPORTANT INFO - ###
# This file is created by SuperMesh scripts. Please do not amend these
# manualy. Use either the SuperMesh shell scripts or the Web User
# Interface of SuperMesh.
###########################

# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto eth0
iface eth0 inet dhcp

# The primary network interface created from USB port. (eg. USB tethering)
auto eth1
iface eth1 inet dhcp

# The primary wireless network interface
auto wlan1
iface wlan1 inet dhcp
wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf

# Wireless network interface used for Access Point
auto wlan0
allow-hotplug wlan0
iface wlan0 inet static
address $staticip
netmask $netmask
gateway $routerip metric 1000
# 'metric' is used to set this gateway as secondary on system.
# Primary should be the one from primary network interaces.
EOF
#don't use any space before of after 'EOF' in the previous line

  echo ""
  echo "Your informatons was saved in '$1' file."
  echo ""
  exit 0
}

file="/home/satinder/test/interfaces"
dpkgfile="/home/satinder/test/interfaces.dpkgfile"

if [ ! -f $dpkgfile ]; then
  echo ""
  echo "The original dpkg file '$dpkgfile' doesn't exist! Taking backup in same location."
  cp -av $file $dpkgfile
  echo "The original dpkg file backuped to '$dpkgfile'."
  echo ""
  #exit 1
fi

if [ ! -f $file ]; then
  echo ""
  echo "The file '$file' doesn't exist!"
  echo ""
  exit 1
fi



clear
echo "Let's set up a static ip address for your site"
echo ""

#getinfo
staticip=$1
netmask=$2
routerip=$3
echo ""
echo "So your settings are:"
echo "Your decided Server IP is:   $staticip"
echo "The Mask for the Network is: $netmask"
echo "Address of your Router is:   $routerip"
echo ""

# This example code disabled. Used only for testing purposes by reading input.
#while true; do
#  read -p "Are these informations correct? [y/n]: " yn 
#  case $yn in
#    [Yy]* ) writeinterfacefile $file;;
#    [Nn]* ) getinfo;;
#        * ) echo "Pleas enter y or n!";;
#  esac
#done

writeinterfacefile $file