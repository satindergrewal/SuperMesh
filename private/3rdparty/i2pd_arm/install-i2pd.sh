#!/bin/sh

USER="$(who am i | awk '{print $1}')"

sudo cp -av i2pd /usr/local/bin/
sudo cp -av i2pd.service /etc/systemd/system/
sudo mkdir -p /media/usb/i2pd
sudo cp -av i2pd.conf subscriptions.txt tunnels.conf /media/usb/i2pd/
sudo chown -R "${USER}":"${USER}" /media/usb/i2pd
rm -rf ~/.i2pd
ln -s /media/usb/i2pd $HOME/.i2pd
sudo sed -i "s/root/${USER}/" /etc/systemd/system/i2pd.service
sudo systemctl enable i2pd
sudo systemctl start i2pd
