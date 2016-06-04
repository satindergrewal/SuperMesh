#### What is SuperMesh?
SuperMesh brings many Decentralized technologies with ease to your home.

This includes different networks like:
- TOR,
- I2P, 
- cjdns,
- IPFS
- decentralized domains like .bit

And Decentralized blockchain and applications like:
- Bitcoin,
- OpenBazaar,
- BitcoinDark,
- FreeMarket,
- Decentralized Currency Exchange like InstantDEX,
- Ethereum Exchange EtherEx
- Blockchain technlogy based anonymous instant messaging application [Telepathy](http://wiki.supernet.org/wiki/Telepathy)
- and many more!

![supermesh laptop view](https://raw.githubusercontent.com/satindergrewal/SuperMesh/alpha-0.0.1e/supermesh_images/laptop.jpg)

#### What new features are coming to SuperMesh alpha-0.0.3

<!-- This extra line is necessary for table to render properly. -->
|                      |    Status      |      Description     |
|--------------------------------------------------------------|--------------------|-----------------------------------------------|
| __TOR Gateway__      | :clock3:       | In Progress          |
| __TOR Proxy__        | :clock3:       | In Progress          |
| __DNSChain__         | :white_circle: | Not Started Yet      |
| __Namecoin Support__ | :white_circle: | Not Started Yet      |
| __I2P Gateway__      | :white_circle: | Not Started Yet      |
| __I2P Proxy__        | :white_circle: | Not Started Yet      |
| __cjdns__            | :white_circle: | Not Started Yet      |
| __IPFS__             | :white_circle: | Not Started Yet      |


## Supported IoT Devices
 - [Raspberry Pi 2 Model B](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/)
 - [Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)
 - [Odroid-XU4](http://www.hardkernel.com/main/products/prdt_info.php?g_code=G143452239825)

## Requirements
 - [Raspbian Jessie Lite](https://www.raspberrypi.org/downloads/raspbian/)
 - [Ubuntu 15.04 Robotics Edition: XU3/XU4 (ROS+OpenCV+PCL)](http://forum.odroid.com/viewtopic.php?f=95&t=16149)

If Raspberry Pi 3 Model B
 - 1 USB WiFi Adapter
 - 1 USB to LAN Adapter

If Raspberry Pi 2 Model B
 - 2 USB WiFi Adaper
 - 1 USB to LAN Adapter

If Odroid-XU4
 - 2 USB WiFi Adapter
 - 1 USB to LAN Adapter


## What this SuperMesh Alpha 0.0.3 build does so far
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


### Did you face any problem setting up this alpha build?
If you face any problem setting up this alpha build, please feel free to create an issue here:
https://github.com/satindergrewal/SuperMesh/issues

Or you can live chat with me on SuperNet slack in #spacemesh channel. To join SuperNet Slack please follow this link:
http://slackinvite.supernet.org

There will be other mediums of contact as well in future including IRC Channels, official website, forum, etc. But for now I'm busy developing SuperMesh and full time job and I don't have much help managing community. And it doesn't feel like the right time to have one, as the software isn't yet at that stage, but very soon will be.

Please feel free to contact me on twitter @satindergrewal



### Install using installer script
You can install using this command on fresh installation of Raspbian Jesse Lite

`curl -L https://raw.githubusercontent.com/satindergrewal/SuperMesh/alpha-0.0.3/install.sh | bash -`

Or just use these commands to download the installer shell script and then execute to start installation:
```shell
curl -O https://raw.githubusercontent.com/satindergrewal/SuperMesh/alpha-0.0.3/install.sh
chmod +x install.sh
./install.sh
```

It will download the shell script from following link and start executing all step-by-step commands to install and reboot SuperMesh

https://github.com/satindergrewal/SuperMesh/blob/alpha-0.0.3/install.sh



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
`sudo apt-get -y install git nodejs npm lshw wireless-tools tor`


#### Make node binary symlink
`sudo ln -s /usr/bin/nodejs /usr/bin/node`


#### Clone SuperMesh's test build to system
`git clone -b alpha-0.0.3 https://github.com/satindergrewal/SuperMesh`


#### Move SuperMesh to /opt directory
`sudo mv SuperMesh /opt/`


#### Change directory to SuperMesh
```shell
cd /opt/SuperMesh/

# Fix permissions of supermesh files
chmod 644 /opt/SuperMesh/private/system_scripts/*.cf
```


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
`sudo apt-get install isc-dhcp-server hostapd pdns-recursor`


#### Starting SuperMesh sytstem service
`sudo systemctl start supermesh`


#### Setting up IP forwarding
```shell
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/sysctl_conf.cf
curl -L http://localhost:3000/admin/firewall/enableipv4fwd
```

#### Configuring Raspberry Pi settings using SuperMesh's default system scripts
```shell
# Setting up and restarting network settings
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/edit_network_config.cf
sudo cf-agent -K private/system_scripts/supermeshhosts.cf
sudo rm /etc/supermeshhosts.cf-before-edit
sudo systemctl daemon-reload
sudo systemctl restart networking

# Setting up DHCPD settings & restarting service
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/dhcpd_conf.cf
sudo systemctl daemon-reload
sudo systemctl enable isc-dhcp-server
sudo systemctl restart isc-dhcp-server
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
sudo systemctl enable hostapd
sudo systemctl restart hostapd
```

#### Setting up DNS Service & restarting service
```shell
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/recursor_conf.cf
sudo systemctl daemon-reload
sudo systemctl enable pdns-recursor
sudo systemctl restart pdns-recursor
```

#### Setting up Tor Service & restarting service
```shell
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/torrc.cf
curl -L http://localhost:3000/admin/tor/enabletor
sudo systemctl daemon-reload
sudo systemctl enable tor
sudo systemctl restart tor
```


#### Remove any unwanted files which generated during install
```shell
sudo rm /etc/network/interfaces.cf-before-edit
sudo rm /etc/dhcp/dhcpd.conf.cf-before-edit
sudo rm /etc/hostapd/hostapd.conf.cf-before-edit
sudo rm /etc/default/isc-dhcp-server.cf-before-edit
sudo rm /etc/default/hostapd.cf-before-edit
sudo rm /etc/sysctl.conf.cf-before-edit
sudo rm /etc/powerdns/recursor.conf.cf-before-edit
```

#### Reboot the system
```shell
sudo reboot
```


