#!/bin/sh
cd /home/pi/nxtpi/
#java -DsocksProxyHost=127.0.0.1 -DsocksProxyPort=9050 -Xms384m -Xmx576M -Djava.net.preferIPv6Addresses=true -cp classes:lib/*:conf nxt.Nxt
java -Xms384m -Xmx576M -Djava.net.preferIPv6Addresses=true -cp classes:lib/*:conf nxt.Nxt
