#!/bin/bash

red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

sudo apt-get update
sudo apt-get install -y git

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  TARGET="$(readlink "$SOURCE")"
  if [[ $TARGET == /* ]]; then
    echo "SOURCE '$SOURCE' is an absolute symlink to '$TARGET'"
    SOURCE="$TARGET"
  else
    DIR="$( dirname "$SOURCE" )"
    echo "SOURCE '$SOURCE' is a relative symlink to '$TARGET' (relative to '$DIR')"
    SOURCE="$DIR/$TARGET" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
  fi
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

if [ ! -d "$DIR/srcfiles" ]; then
	echo "Directory $DIR/srcfiles doesn't exists..."
	mkdir -p $DIR/srcfiles
	if [ ! -d "$DIR/srcfiles/btcdlinux" ]; then
		echo "Directory $DIR/srcfiles/btcdlinux doesn't exists..."
		mkdir -p $DIR/srcfiles/btcdlinux/
	fi
fi

if [ ! -d "$DIR/srcfiles/btcdlinux/btcd" ]; then
	cd $DIR/srcfiles/btcdlinux/
	git clone https://github.com/jl777/btcd
fi

if [ -d "$DIR/srcfiles/btcdlinux/btcd" ]; then
	cd $DIR/srcfiles/btcdlinux/btcd/libjl777
	git pull
	git pull
	make clean
	cd $DIR/srcfiles/btcdlinux/btcd/src
	make clean
	cd $DIR/srcfiles/btcdlinux/btcd/src/leveldb
	make clean
	cd $DIR/srcfiles/btcdlinux/btcd/libjl777
	make dependencies
	sudo ln -s /usr/bin/clang-3.4 /usr/bin/clang
	make onetime
	make SuperNET
	make api
	make libccoin
	make btcd
	
	mkdir -p $DIR/srcfiles/bin/linux
	cp -av $DIR/srcfiles/btcdlinux/btcd/libjl777/BitcoinDarkd $DIR/srcfiles/bin/linux/
	#mkdir -p $DIR/srcfiles/bin/linux/websocketd
	#cp -av $DIR/srcfiles/btcdlinux/btcd/libjl777/websocketd/websocketd $DIR/srcfiles/bin/linux/websocketd/
	mkdir -p $DIR/srcfiles/bin/linux/plugins/
	cp -av $DIR/srcfiles/btcdlinux/btcd/libjl777/plugins/cgi/ $DIR/srcfiles/bin/linux/plugins

	btcdlinuxtime=`date +%F-%s`

	if [ ! -d "$DIR/btcdbinaries" ]; then
		mkdir $DIR/btcdbinaries
	fi

	cd ../../../../
	tar -cjvf $DIR/btcdbinaries/BitcoinDark-linux-$btcdlinuxtime.tar.bz2 srcfiles/bin/linux/
	#rm -rf $DIR/srcfiles/bin
	ls -lh $DIR/btcdbinaries/

	##### We got BitcoinDarkd for linux compiled (hopefully...) #####
	##### Now we'll make linux installer package #####

	if [ ! -d "$DIR/srcfiles/btcd-web-wallet" ]; then
		cd $DIR/srcfiles
		git clone https://github.com/btcddev/btcd-web-wallet
	elif [ -d "$DIR/srcfiles/btcd-web-wallet" ]; then
		cd $DIR/srcfiles/btcd-web-wallet
		git pull
		cd ..
	fi
	
	if [ -d "BitcoinDarkFiles" ]; then
		rm -rf BitcoinDarkFiles
		cp -a btcd-web-wallet BitcoinDarkFiles
	elif [ ! -d "BitcoinDarkFiles" ]; then
		cp -a btcd-web-wallet BitcoinDarkFiles
	fi

	cd BitcoinDarkFiles
	npm install
	rm -rf btcd/osx btcd/win32 btcd/win64 btcd/linux
	mkdir -p btcd/linux
	cp -av ../bin/linux/ btcd/
	echo "{}" > btcd/linux/SuperNET.conf && echo "{}" > SuperNET.conf
	cd ..

	if [ -d "BTCDWallet" ]; then
		rm -rf BTCDWallet
		mkdir BTCDWallet
	elif [ ! -d "BTCDWallet" ]; then
		mkdir BTCDWallet
	fi

	mv BitcoinDarkFiles BTCDWallet

	cd BTCDWallet
	cp -av BitcoinDarkFiles/scripts/btcdwallet ./
	rm -rf BitcoinDarkFiles/.git*
	wget -c http://dl.nwjs.io/v0.12.3/nwjs-v0.12.3-linux-x64.tar.gz -O /tmp/nwjs-v0.12.3-linux-x64.tar.gz
	tar -xf /tmp/nwjs-v0.12.3-linux-x64.tar.gz
	mv nwjs-v0.12.3-linux-x64 nwjs
	cd ../../

	if [ ! -d "$DIR/appbuilds" ]; then
		mkdir appbuilds
	fi
	
	btcdlinuxapptime=`date +%F-%s`
	cp -av srcfiles/BTCDWallet ./
	cp BTCDWallet/BitcoinDarkFiles/scripts/installer.run ./BitcoinDarkInstaller.run
	echo "${green}Please wait till the installer file is getting ready...${reset}"
	tar czf - BTCDWallet >> BitcoinDarkInstaller.run && chmod +x BitcoinDarkInstaller.run
	mv BitcoinDarkInstaller.run appbuilds/BitcoinDarkInstaller-$btcdlinuxapptime.run
	#tar -cjvf  appbuilds/BTCDWallet-linux-$btcdlinuxapptime.tar.bz2 BTCDWallet/
	rm -rf BTCDWallet
	ls -lh appbuilds
	rm -rf $DIR/srcfiles/bin # After make remove linux BTCD binaries
	rm -rf $DIR/srcfiles/BTCDWallet #After make remove BTCDWallet files
	echo "${green}Installer file is ready. and located in $DIR/appbuilds.${reset}"
fi
