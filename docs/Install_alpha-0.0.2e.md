
#### Importing cfengine repo gpg key
`sudo wget http://cfengineers.net/repo/autobuilder.gpg -O /etc/apt/trusted.gpg.d/cfengineers-repo.gpg`


#### Adding cfengine repository for Raspbian Jesse
`sudo bash -c "echo 'deb http://cfengineers.net/repo raspjessie main' >> /etc/apt/sources.list"`


#### Updating and intalling cfengine
`sudo apt-get update`

sudo apt-get install cfengine3

#### Installing dependencies
`sudo apt-get -y install git nodejs npm`


#### Clone SuperMesh's test build to system
`git clone -b alpha-0.0.2e https://github.com/satindergrewal/SuperMesh`


#### Move SuperMesh to /opt directory
`sudo mv SuperMesh /opt/`


#### Change directory to SuperMesh
`cd /opt/SuperMesh/`


#### Installing SuperMesh
`npm install`


#### Copying SuperMesh as a system service and enabling it to start at system boot
`sudo cp -av /opt/SuperMesh/private/system_scripts/supermesh.service /etc/systemd/system/`

sudo systemctl enable supermesh

#### Starting SuperMesh sytstem service
`sudo systemctl start supermesh`


#### Installing more required system packages
`sudo apt-get install isc-dhcp-server hostapd`
