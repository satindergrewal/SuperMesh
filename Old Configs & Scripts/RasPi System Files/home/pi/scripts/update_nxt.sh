#!/bin/bash

clear

dir_location=/home/pi

currentnxt=$(cat $dir_location/current_nxt | sed 's/.*-//' | sed 's/.\{4\}$//')
nxtfile=$(curl https://bitbucket.org/JeanLucPicard/nxt/downloads/ | grep 'class="execute" href="' | grep zip | sed -n '1p;/PATTERN/p' | sed 's/.*href="//' | sed 's/.*">//' | sed 's/.\{9\}$//')

if [ "$nxtfile" = "" ]
then
	exit
fi

nxtfileversion=$(echo $nxtfile | sed 's/.*-//' | sed 's/.\{4\}$//')

if [ "$nxtfileversion" = "$currentnxt" ]
then
	echo "Latest version of NXT is already installed."
else
pkill java
echo $nxtfile > $dir_location/current_nxt
wget -c https://bitbucket.org/JeanLucPicard/nxt/downloads/$nxtfile -O $dir_location/nxt.zip
unzip $dir_location/nxt.zip -d $dir_location/

rm $dir_location/nxt.zip

cp -av $dir_location/scripts/nxtrun.sh $dir_location/nxt/
cp -av $dir_location/scripts/nxt.properties $dir_location/nxt/conf/

rm -rf $dir_location/nxtpi

mv -v $dir_location/nxt $dir_location/nxtpi

chown -R pi:pi /home/pi/
screen -A -m -d -S nxtboot /home/pi/nxtpi/nxtrun.sh
fi

