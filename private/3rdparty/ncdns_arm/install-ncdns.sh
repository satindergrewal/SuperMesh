#!/bin/sh

USER="$(who am i | awk '{print $1}')"

sudo cp -av ncdns ncdt ncdumpzone /usr/local/bin/
sudo cp -av ncdns.service /etc/systemd/system/
sudo mkdir -p /etc/ncdns
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/ncdns_conf.cf
sudo chown -R "${USER}":"${USER}" /etc/ncdns
sudo sed -i "s/root/${USER}/" /etc/systemd/system/ncdns.service
sudo systemctl enable ncdns
sudo systemctl start ncdns
