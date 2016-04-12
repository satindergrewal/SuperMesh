SuperMesh Dependencies:
 - nodejs version 0.10+
 - npm
 - git
 
To install dependencies: `sudo apt-get -y install git nodejs npm`

To install grunt-cli: `sudo npm install -g grunt-cli`

To clone git repo: `git clone https://github.com/satindergrewal/SuperMesh`

If cloning test branch of SuperMesh (e.g. alpha-0.0.1e):

`git clone -b branch_name_here https://github.com/satindergrewal/SuperMesh`

Example:

`git clone -b alpha-0.0.2e https://github.com/satindergrewal/SuperMesh`

To initialize SuperMesh nodejs app:

`cd SuperMesh`

`npm install`

Now start SuperMesh nodejs app with root privilege:

`sudo npm start`

Access SuperMesh Web UI from system's address on port `3000`. Like http://localhost:3000

Login page: http://localhost:3000/login

Admin page: http://localhost:3000/admin
