# Requirements
 - Raspberry Pi 2 or Raspberry Pi 3
 - [Raspbian Jessie Lite](https://www.raspberrypi.org/downloads/raspbian/)

If Raspberry Pi 3
 - 1 USB WiFi Adapter
 - 1 USB to LAN Adapter

If Raspberry Pi 2
 - 2 USB WiFi Adaper
 - 1 USB to LAN Adapter


### Install using installer script
You can install using this command on fresh installation of Raspbian Jesse Lite

`curl -L https://raw.githubusercontent.com/satindergrewal/SuperMesh/alpha-0.0.2e/install.sh | bash`

Or just use these commands to download the installer shell script and then execute the start installation:
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


#### Copyting configuration data from SuperMesh Sample Data to system
```shell
sudo cp -av /opt/SuperMesh/private/system_scripts/sample_data /opt/SuperMeshData
```

#### Installing more required system packages
`sudo apt-get install isc-dhcp-server hostapd`

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
```


#### Starting SuperMesh sytstem service
`sudo systemctl start supermesh`


#### Configuring Raspberry Pi settings using SuperMesh's default system scripts
```shell
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/edit_network_config.cf 
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/hostapd_conf.cf
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/dhcpd_conf.cf
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/sysctl_conf.cf
curl -O http://localhost:3000/admin/firewall/enableipv4fwd

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


