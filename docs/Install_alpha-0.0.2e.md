
#### Importing cfengine repo gpg key
`sudo wget http://cfengineers.net/repo/autobuilder.gpg -O /etc/apt/trusted.gpg.d/cfengineers-repo.gpg`


#### Adding cfengine repository for Raspbian Jesse
`sudo bash -c "echo 'deb http://cfengineers.net/repo raspjessie main' >> /etc/apt/sources.list"`


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
```


#### Starting SuperMesh sytstem service
`sudo systemctl start supermesh`


#### Configuring Raspberry Pi settings using SuperMesh's default system scripts
```shell
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/edit_network_config.cf 
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/hostapd_conf.cf
sudo cf-agent -K /opt/SuperMesh/private/system_scripts/dhcpd_conf.cf
curl -O http://localhost:3000/admin/firewall/enableipv4fwd

```
