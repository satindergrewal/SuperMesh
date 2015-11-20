#!/bin/sh

usage(){
        echo "Usage: cjdns-installer.sh [OPTION...]"
        echo ""
        echo "Example:"
        echo "  ./cjdns-installer.sh -install           # Will install CJDNS"
        echo "  ./cjdns-installer.sh -update            # Will update CJDNS"
        echo "  ./cjdns-installer.sh -start             # Will start CJDNS service"
        echo "  ./cjdns-installer.sh -stop              # Will stop CJDNS service"
        echo ""
        echo "Options:"
        echo "  -install                        : To install CJDNS."    
        echo "  -update                         : To update CJDNS."
        echo "  -start                          : To start CJDNS."
        echo "  -stop                           : To stop CJDNS."
        echo "  -restart                        : To restart CJDNS."
        echo "  -show-running                   : To show running service."
        echo "  -show-ip                        : To show IPv6 address of tun0."
        echo "  -get-peers                      : To show information about getting CJDNS peers."
        echo "  -help                           : To see this help."
        exit 1
}

if  [ "$1" = "-install" ]; then
        echo "Installing CJDNS..."
        apt-get -y install nodejs git build-essential devscripts debhelper
        cd /opt
        git clone https://github.com/cjdelisle/cjdns.git cjdns
        cd cjdns
        ./do
elif  [ "$1" = "-update" ]; then
        echo "Stopping CJDNS..."
        pkill -9 cjdroute       
        cd /opt/cjdns
        echo "Updating CJDNS files..."
        git pull
        echo "Compiling updated CJDNS files..."
        ./do
        echo "Starting CJDNS Service..."
        sudo ./cjdroute < cjdroute.conf
        echo "Your CJDNS IPv6 address is:"
        ifconfig tun0 | grep inet6 | awk '{print $3}'
elif  [ "$1" = "-start" ]; then
        echo "Starting CJDNS..."
        cd /opt/cjdns
        sudo ./cjdroute < cjdroute.conf
        echo "Your CJDNS IPv6 address is:"
        ifconfig tun0 | grep inet6 | awk '{print $3}'
elif  [ "$1" = "-stop" ]; then
        echo "Stopping CJDNS..."
        pkill -9 cjdroute
elif  [ "$1" = "-restart" ]; then
        echo "Stopping CJDNS..."
        pkill -9 cjdroute
        echo "Starting CJDNS..."
        cd /opt/cjdns
        sudo ./cjdroute < cjdroute.conf
        echo "Your CJDNS IPv6 address is:"
        ifconfig tun0 | grep inet6 | awk '{print $3}'
elif  [ "$1" = "-show-ip" ]; then
        ps aux | grep cjdroute | grep -v 'grep'
elif  [ "$1" = "-show-running" ]; then
        echo "Your CJDNS IPv6 address is:"
        ifconfig tun0 | grep inet6 | awk '{print $3}'
elif  [ "$1" = "-get-peers" ]; then
        echo "  Get public peers info from: https://pad.meshwith.me/p/public"
        echo ""
        echo "  Or visit IRC: irc://irc.EFNet.org/#cjdns"
        echo "  and use the command in #cjdns channel:"
        echo ""
        echo "  ? public"
        echo ""
        echo "  It will show you some website links, where you'll find cjdns public peer info."
        echo "  You can find more info on how to configure these peers to your cjdroute.conf file here: https://wiki.projectmeshnet.org/How_To_Add_Peers"
elif  [ "$1" = "-help" -o "$1" = "-h" -o "$1" = "--help" ]; then
        usage
else
        usage
fi
