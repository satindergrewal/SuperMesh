#!/bin/bash

sudo apt-get update
sudo apt-get install -y git npm libgtk2.0-dev

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
	#git clone https://github.com/jl777/btcd
	git clone https://github.com/SuperNETorg/BitcoinDark-SuperNET
	mv BitcoinDark-SuperNET btcd
fi

if [ -d "$DIR/srcfiles/btcdlinux/btcd" ]; then
	cd $DIR/srcfiles/btcdlinux/btcd/libjl777
	git pull
	git pull
	make clean -f Makefile.win
	cd $DIR/srcfiles/btcdlinux/btcd/src
	make clean -f Makefile.win
	cd $DIR/srcfiles/btcdlinux/btcd/src/leveldb
	make clean
	cd $DIR/srcfiles/btcdlinux/btcd/libjl777
	make dependencies -f Makefile.win OS=win64	
	make winpatch -f Makefile.win OS=win64
	make SuperNET -f Makefile.win OS=win64
	make btcd -f Makefile.win OS=win64
	
	mkdir -p $DIR/srcfiles/bin/win64
	cp -av $DIR/srcfiles/btcdlinux/btcd/libjl777/bin/win64/BitcoinDarkd.exe $DIR/srcfiles/bin/win64/
	cp -av $DIR/srcfiles/btcdlinux/btcd/libjl777/bin/win64/SuperNET.exe $DIR/srcfiles/bin/win64/
	mkdir -p $DIR/srcfiles/bin/win64/plugins/
	cp -av $DIR/srcfiles/btcdlinux/btcd/libjl777/plugins/cgi/ $DIR/srcfiles/bin/win64/plugins

	btcdwin64time=`date +%F-%s`

	if [ ! -d "$DIR/btcdbinaries" ]; then
		mkdir $DIR/btcdbinaries
	fi

	cd ../../../../
	tar -cjvf $DIR/btcdbinaries/BitcoinDark-win64-$btcdwin64time.tar.bz2 srcfiles/bin/win64/
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
	rm -rf btcd/osx btcd/win32 btcd/win64 btcd/linux
	if [ -d "btcd" ]; then
                cp -av ../bin/win64 btcd
        elif [ ! -d "btcd" ]; then
                mkdir btcd && cp -av ../bin/win64 btcd
        fi

	echo "{}" > btcd/win64/SuperNET.conf && echo "{}" > SuperNET.conf
	cd ..

	if [ -d "BTCDWallet" ]; then
		rm -rf BTCDWallet
		mkdir BTCDWallet
	elif [ ! -d "BTCDWallet" ]; then
		mkdir BTCDWallet
	fi

	mv BitcoinDarkFiles BTCDWallet

	cd BTCDWallet
	rm -rf BitcoinDarkFiles/.git*
	wget -c http://dl.nwjs.io/v0.12.3/nwjs-v0.12.3-win-x64.zip -O /tmp/nwjs-v0.12.3-win-x64.zip
	unzip /tmp/nwjs-v0.12.3-win-x64.zip
	mv nwjs-v0.12.3-win-x64 nwjs
	cd ../../

	if [ ! -d "$DIR/appbuilds" ]; then
		mkdir appbuilds
	fi

	btcdwin64apptime=`date +%F-%s`
	cp -av srcfiles/BTCDWallet ./
	cd BTCDWallet/BitcoinDarkFiles
	npm install
	zip -r BitcoinDark.zip ./*
	mv BitcoinDark.zip ../nwjs/BitcoinDark.nw
	cd ../nwjs/
	rm -rf credits.html d3dcompiler_47.dll ffmpegsumo.dll pdf.dll lib*
	echo "${green}Please wait till the installer file is getting ready...${reset}"
	cat nw.exe BitcoinDark.nw > BitcoinDark.exe
	rm -rf BitcoinDark.nw
	cd ..
	mv nwjs BTCDWin64
	zip -r BitcoinDark-win64-$btcdwin64apptime.zip BTCDWin64
	mv BitcoinDark-win64* ../appbuilds/
	cd ..
	rm -rf BTCDWallet
	ls -lh appbuilds
	rm -rf $DIR/srcfiles/bin # After make remove linux BTCD binaries
	rm -rf $DIR/srcfiles/BTCDWallet #After make remove BTCDWallet files
	echo "${green}Installer file is ready. and located in $DIR/appbuilds.${reset}"
fi
