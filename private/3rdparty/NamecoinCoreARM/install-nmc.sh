#!/bin/sh

USER="$(who am i | awk '{print $1}')"

sudo cp -av bench_namecoin namecoin-cli namecoind namecoin-tx test_namecoin /usr/local/bin/
sudo cp -av namecoin.service /etc/systemd/system/
sudo mkdir -p /media/usb/namecoin
sudo chown -R "${USER}":"${USER}" /media/usb/namecoin
echo "rpcuser=pi"  > /media/usb/namecoin/namecoin.conf
echo "rpcpassword=`openssl rand -hex 20`"  >> /media/usb/namecoin/namecoin.conf
echo "rpcport=8336" >> /media/usb/namecoin/namecoin.conf
echo "server=1" >> /media/usb/namecoin/namecoin.conf
rm -rf ~/.namecoin
ln -s /media/usb/namecoin $HOME/.namecoin
sudo sed -i "s/root/${USER}/" /etc/systemd/system/namecoin.service
sudo systemctl enable namecoin
sudo systemctl start namecoin