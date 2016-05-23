## Supported IoT Devices
 - [Raspberry Pi 2 Model B](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/)
 - [Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)

## Requirements
 - [Raspbian Jessie Lite](https://www.raspberrypi.org/downloads/raspbian/)

If Raspberry Pi 3 Model B
 - 1 USB WiFi Adapter
 - 1 USB to LAN Adapter

If Raspberry Pi 2 Model B
 - 2 USB WiFi Adaper
 - 1 USB to LAN Adapter


## What this SuperMesh Alpha 0.0.2e build does so far
This is the most basic and the base requirement build of SuperMesh. It only targets on setting up network and routing part on supported IoT devices. After installing following features are available:
 - Default Access Point named **TestNetWiFi** with default password **spacemesh**
 - Access to internet through different hardware availablity, i.e.
  - Internet LAN Cable in onboard LAN Port, Internet LAN cable from USBtoLAN port to PC/Laptop/Router
  - Internet LAN Cable in onboard LAN Port, Internet access from first Wifi Adapter
  - Internet from second Wifi Adapter by connecting to other WiFi around, passing internet to first WiFi Adapter and let users connect to it as it works as Access Point with SSID **TestNetWiFi** by default.
 - SuperMesh Web UI accessible at http://Raspberry_Pi_IP:3000
  - If connected to TestNetWiFi default address would be http://192.168.10.1:3000
  - If conected through USBtoLAN LAN port default address would be http://172.20.10.1:3000
 - SuperMesh Control Centre Admin pages allows setting up following system settings via web interface:
  - Network Settings: Changing interfaces settings
  - WiFi Settings: Connecting to existing WiFi networks around. Example, in library, coffee shop etc.
  - Access Point Settings: Lets user change WiFi SSID, Password and other settings as per their USB WiFi Adapter.
  - DHCPD Settings: Lets user setup DHCP settings for network users connecting to SuperMesh device. It's very Basic for now.
  - Firewall Settings: Only allows enableing disableing IPv4 and IPv6 forwarding setup and some basic iptables rules setup.

 All these settings are basic, and will advance as SuperMesh development advances.



### Install using installer script
You can install using this command on fresh installation of Raspbian Jesse Lite

`curl -L https://raw.githubusercontent.com/satindergrewal/SuperMesh/alpha-0.0.2e/install.sh | bash -`

Or just use these commands to download the installer shell script and then execute to start installation:
```shell
curl -O https://raw.githubusercontent.com/satindergrewal/SuperMesh/alpha-0.0.2e/install.sh
chmod +x install.sh
./install.sh
```

It will download the shell script from following link and start executing all step-by-step commands to install and reboot SuperMesh

https://github.com/satindergrewal/SuperMesh/blob/alpha-0.0.2e/install.sh



### Install using step-by-step instructions

#### Importing cfengine repo gpg key
`sudo wget http://cfengineers.net/repo/autobuilder.gpg -O /etc/apt/trusted.gpg.d/cfengineers-repo.gpg`


#### Adding cfengine repository for Raspbian Jesse
`sudo bash -c "echo 'deb http://cfengineers.net/repo raspjessie main' >> /etc/apt/sources.list.d/cfengineers.list"`


#### Updating and intalling cfengine
```shell
sudo apt-get update
sudo apt-get install cfengine3
```

#### Installing dependencies
`sudo apt-get -y install git nodejs npm lshw`


#### Make node binary symlink
`sudo ln -s /usr/bin/nodejs /usr/bin/node`


#### Clone SuperMesh's test build to system
`git clone -b alpha-0.0.2e https://github.com/satindergrewal/SuperMesh`


#### Move SuperMesh to /opt directory
`sudo mv SuperMesh /opt/`


#### Change directory to SuperMesh
`cd /opt/SuperMesh/`


#### Installing SuperMesh
`npm install`


#### Copying SuperMesh as a system service and enabling it to start at system boot
```shell
sudo cp -av /opt/SuperMesh/private/system_scripts/supermesh.service /etc/systemd/system/
sudo systemctl enable supermesh
```


#### Copying configuration data from SuperMesh Sample Data to system
```shell
sudo cp -av /opt/SuperMesh/private/system_scripts/sample_data /opt/SuperMeshData
```

#### Installing more required system packages
`sudo apt-get install isc-dhcp-server hostapd`


#### Configuring Raspberry Pi settings using SuperMesh's default system scripts
```shell
# Setting up and restarting network settings
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/edit_network_config.cf
sudo systemctl daemon-reload
sudo systemctl restart networking

# Setting up DHCPD settings & restarting service
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/dhcpd_conf.cf
sudo systemctl daemon-reload
sudo systemctl restart isc-dhcp-server



sudo cf-agent -K /opt/SuperMesh/private/system_scripts/sysctl_conf.cf
curl -L http://localhost:3000/admin/firewall/enableipv4fwd

```

#### Setting up hostapd drivers
```shell
# Copying hostapd drviers to system for Edimax 802.11bgn wifi adapter & Edimax 802.11ac wifi adapter
sudo cp -av /opt/SuperMesh/private/system_scripts/drivers/hostapd* /usr/sbin/

# Renaming original hostapd and creating a symlink to it
sudo mv /usr/sbin/hostapd /usr/sbin/hostapd_original
sudo ln -s /usr/sbin/hostapd_original /usr/sbin/hostapd

# Making sure hostapd files are executable
sudo chmod +x /usr/sbin/hostapd*

# Setting up hostapd
node /opt/SuperMesh/private/js/install_helper.js

# Setting up Access Point settings & restarting service
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/hostapd_conf.cf
sudo systemctl daemon-reload
sudo systemctl restart hostapd
```


#### Starting SuperMesh sytstem service
`sudo systemctl start supermesh`


#### Setting up IP forwarding
```shell
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/sysctl_conf.cf
curl -L http://localhost:3000/admin/firewall/enableipv4fwd
```

#### Remove any unwanted files which generated during install
```shell
sudo rm /etc/network/interfaces.cf-before-edit
sudo rm /etc/dhcp/dhcpd.conf.cf-before-edit
sudo rm /etc/hostapd/hostapd.conf.cf-before-edit
sudo rm /etc/default/isc-dhcp-server.cf-before-edit
sudo rm /etc/default/hostapd.cf-before-edit
sudo rm /etc/sysctl.conf.cf-before-edit
```

#### Reboot the system
```shell
sudo reboot
```


