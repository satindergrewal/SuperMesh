#!/bin/bash

#if  [ "$1" = "addr" ]; then
#	awk ' f && NR==f+1; /iface wlan0/ {f=NR}' ./interfaces | awk '{print $2}'
#elif [ "$1" = "netmask" ]; then
#	awk ' f && NR==f+2; /iface wlan0/ {f=NR}' ./interfaces | awk '{print $2}'
#elif [ "$1" = "gateway" ]; then
#        awk ' f && NR==f+3; /iface wlan0/ {f=NR}' ./interfaces | awk '{print $2}'
#fi

#Test file
file='./test/interfaces'
#System interfes file
#file='/etc/network/interfaces'

eth0_dhcp_static=$(awk ' f && NR==f+1; /auto eth0/ {f=NR}' $file | awk '{print $4}')
if [ "$eth0_dhcp_static" == "static" ]; then
	eth0_addr=$(awk ' f && NR==f+1; /iface eth0/ {f=NR}' $file | awk '{print $2}')
	eth0_netmask=$(awk ' f && NR==f+2; /iface eth0/ {f=NR}' $file | awk '{print $2}')
	eth0_gateway=$(awk ' f && NR==f+3; /iface eth0/ {f=NR}' $file | awk '{print $2}')
else
	eth0_addr=''
	eth0_netmask=''
	eth0_gateway=''
fi

wlan0_dhcp_static=$(awk ' f && NR==f+2; /auto wlan0/ {f=NR}' $file | awk '{print $4}')
if [ "$wlan0_dhcp_static" == "static" ]; then
	wlan0_addr=$(awk ' f && NR==f+1; /iface wlan0/ {f=NR}' $file | awk '{print $2}')
	wlan0_netmask=$(awk ' f && NR==f+2; /iface wlan0/ {f=NR}' $file | awk '{print $2}')
	wlan0_gateway=$(awk ' f && NR==f+3; /iface wlan0/ {f=NR}' $file | awk '{print $2}')
else
	wlan0_addr=''
	wlan0_netmask=''
	wlan0_gateway=''
fi

cat << EOF
[{"eth0":{"dhcp_static":"$eth0_dhcp_static","addr":"$eth0_addr","netmask":"$eth0_netmask","gateway":"$eth0_gateway"}},
{"wlan0":{"dhcp_static":"$wlan0_dhcp_static","addr":"$wlan0_addr","netmask":"$wlan0_netmask","gateway":"$wlan0_gateway"}}]
EOF
