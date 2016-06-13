var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");
var ifstate = require("../private/js/ifstate.js");

/* GET hostapd settings. */
router.get('/', function(req, res, next) {
  res.render('tor', {title: 'Controle Centre Admin'});
});

router.get('/getsettings', function(req, res, next) {
	var torrcFile = '/opt/SuperMeshData/torrc.data'
	var torrcfsRead = fs.readFileSync(torrcFile, 'utf8').toString();
	var settingsdata = JSON.parse(torrcfsRead);

	console.log('===>> TorSettings DATA recieved >>');
	console.log('=========== JSON Stringify ===========');
	console.log(JSON.stringify(settingsdata, null, 2));

	res.send(settingsdata);
});


/* POST to Update IPTables Settings. */
router.post('/update', function(req, res) {
	var Promise = require('bluebird');

	// Promise returning functions to execute
	function UpdateGatewaySettings() {
		var torrc_File = '/opt/SuperMeshData/torrc.data'
		var torrc_Data = ''

		var torrcfs_Read = fs.readFileSync(torrc_File, 'utf8').toString();
		var settings_data = JSON.parse(torrcfs_Read);
		//console.log(JSON.stringify(settings_data.EnableTorGateway, null, 2));

		//console.log('======= req.body =======');
		//console.log(req.body);

		torrc_Data = {
			"Eth1Addr": settings_data.Eth1Addr,
			"EnableEth1": settings_data.EnableEth1,
			"Wlan0Addr": settings_data.Wlan0Addr,
			"EnableWlan0": settings_data.EnableWlan0,
			"EnableTorGateway": (req.body.enable_tor_gateway === "false") ? "# " : ""
		}

		//console.log('=========== JSON Stringify ===========');
		//console.log(JSON.stringify(torrc_Data, null, 2))

		// Write update changes to JSON file interfaces.data
		fs.writeFile(torrc_File, JSON.stringify(torrc_Data, null, 2), function (err) {
			if (err) return console.log(err)
				//console.log('======= Setting values from Admin Panel =======')
				//console.log('writing to ' + torrc_File)
				//console.log(JSON.stringify(torrc_Data, null, 2))
			});
		//console.log('>>>>>> Runing 1st')
		return Promise.resolve(1);
	}
	function CheckInterfaceUp(res) {
		var enable_eth1 = '# '
		var enable_wlan0 = '# '

		ifstate.status(function(err, status) {
			var torrcFile = '/opt/SuperMeshData/torrc.data'
			var torrcData = ''

			var torrcfsRead = fs.readFileSync(torrcFile, 'utf8').toString();
			var settingsdata = JSON.parse(torrcfsRead);
			//console.log(JSON.stringify(settingsdata.Eth1Addr, null, 2));
			//console.log(status);

			for (i = 0; i < status.length; i++) {
				if ( status[i].interface == 'eth1' && status[i].state == 'UP' ) {
					console.log(status[i]);
					enable_eth1 = ''
				}
				if ( status[i].interface == 'wlan0' && status[i].state == 'UP' ) {
					console.log(status[i]);
					enable_wlan0 = ''
				}
			}

			torrcData = {
				"Eth1Addr": settingsdata.Eth1Addr,
				"EnableEth1": enable_eth1,
				"Wlan0Addr": settingsdata.Wlan0Addr,
				"EnableWlan0": enable_wlan0,
				"EnableTorGateway": settingsdata.EnableTorGateway
			}

			//console.log(torrcData);
			//console.log('eth1 variable value: ' + enable_eth1);
			//console.log('wlan0 variable value: ' + enable_wlan0);

			fs.writeFile(torrcFile, JSON.stringify(torrcData, null, 2), function (err) {
			if (err) return console.log(err)
				//console.log('======= Setting values for interfaces =======')
				//console.log('writing to ' + torrcFile)
				//console.log(JSON.stringify(torrcData, null, 2))
			});

		});
		//console.log('>>>>>> Runing 2nd')
		return Promise.resolve(res + 1);
	}  
	function getNetworkIPs(res){
		console.log('Getting Network IP...')

		//console.log('>>>>>> Runing 3rd')
		//console.log("result:", res);
		//Execute promissed spanw child process
		SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/torrc.cf; sudo rm /etc/tor/torrc.cf-before-edit');
	}

	var UpdateSteps = [ UpdateGatewaySettings, CheckInterfaceUp, getNetworkIPs ];

	// Execute a list of Promise return functions in series
	function UpdateProcess(list) {  
	  var p = Promise.resolve();
	  return list.reduce(function(pacc, fn) {
	    return pacc = pacc.then(fn);
	  }, p);
	}

	UpdateProcess(UpdateSteps);

	if ( req.body.enable_tor_gateway === 'true' ) {
		// Enable TOR Proxy and Gateway
		// TOR Service Rules
		// Add these rules to allow TOR Transparent Proxy
		//SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
		//SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 9050 -j REDIRECT --to-ports 9050');

		// Add these rules turn SuperMesh device to act as TOR Gateway
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p tcp --syn -j REDIRECT --to-ports 9040; sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040; sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --syn -j REDIRECT --to-ports 9040; sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040; sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"; sudo systemctl enable tor; sudo systemctl restart tor');

	} else if ( req.body.enable_tor_gateway === 'false' ) {
		// Enable TOR Proxy and Gateway
		// TOR Service Rules
		// Add these rules to allow TOR Transparent Proxy
		//SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
		//SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i wlan0 -p udp --dport 9050 -j REDIRECT --to-ports 9050');

		// Add these rules turn SuperMesh device to act as TOR Gateway
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p tcp --syn -j REDIRECT --to-ports 9040; sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040; sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"; sudo systemctl disable tor; sudo systemctl restart tor');
				
	}

	res.end('{"msg": "success","result": "result"}');
	
});


// Update iptabels 4 forwarding
router.get('/enabletor', function(req, res) {
	var Promise = require('bluebird');

	// Promise returning functions to execute
	function UpdateGatewaySettings() {
		var torrc_File = '/opt/SuperMeshData/torrc.data'
		var torrc_Data = ''

		var torrcfs_Read = fs.readFileSync(torrc_File, 'utf8').toString();
		var settings_data = JSON.parse(torrcfs_Read);
		//console.log(JSON.stringify(settings_data.EnableTorGateway, null, 2));

		torrc_Data = {
			"Eth1Addr": settings_data.Eth1Addr,
			"EnableEth1": settings_data.EnableEth1,
			"Wlan0Addr": settings_data.Wlan0Addr,
			"EnableWlan0": settings_data.EnableWlan0,
			"EnableTorGateway": ""
		}

		//console.log('=========== JSON Stringify ===========');
		//console.log(JSON.stringify(torrc_Data, null, 2))

		// Write update changes to JSON file interfaces.data
		fs.writeFile(torrc_File, JSON.stringify(torrc_Data, null, 2), function (err) {
			if (err) return console.log(err)
				//console.log('======= Setting values from Admin Panel =======')
				//console.log('writing to ' + torrc_File)
				//console.log(JSON.stringify(torrc_Data, null, 2))
			});
		//console.log('>>>>>> Runing 1st')
		return Promise.resolve(1);
	}
	function CheckInterfaceUp(res) {
		var enable_eth1 = '# '
		var enable_wlan0 = '# '

		ifstate.status(function(err, status) {
			var torrcFile = '/opt/SuperMeshData/torrc.data'
			var torrcData = ''

			var torrcfsRead = fs.readFileSync(torrcFile, 'utf8').toString();
			var settingsdata = JSON.parse(torrcfsRead);
			//console.log(JSON.stringify(settingsdata.Eth1Addr, null, 2));
			//console.log(status);

			for (i = 0; i < status.length; i++) {
				if ( status[i].interface == 'eth1' && status[i].state == 'UP' ) {
					console.log(status[i]);
					enable_eth1 = ''
				}
				if ( status[i].interface == 'wlan0' && status[i].state == 'UP' ) {
					console.log(status[i]);
					enable_wlan0 = ''
				}
			}

			torrcData = {
				"Eth1Addr": settingsdata.Eth1Addr,
				"EnableEth1": enable_eth1,
				"Wlan0Addr": settingsdata.Wlan0Addr,
				"EnableWlan0": enable_wlan0,
				"EnableTorGateway": settingsdata.EnableTorGateway
			}

			//console.log(torrcData);
			//console.log('eth1 variable value: ' + enable_eth1);
			//console.log('wlan0 variable value: ' + enable_wlan0);

			fs.writeFile(torrcFile, JSON.stringify(torrcData, null, 2), function (err) {
			if (err) return console.log(err)
				//console.log('======= Setting values for interfaces =======')
				//console.log('writing to ' + torrcFile)
				//console.log(JSON.stringify(torrcData, null, 2))
			});

		});
		//console.log('>>>>>> Runing 2nd')
		return Promise.resolve(res + 1);
	}  
	function getNetworkIPs(res){
		console.log('Getting Network IP...')

		//console.log('>>>>>> Runing 3rd')
		//console.log("result:", res);
		//Execute promissed spanw child process
		SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/torrc.cf; sudo rm /etc/tor/torrc.cf-before-edit');
	}

	var UpdateSteps = [ UpdateGatewaySettings, CheckInterfaceUp, getNetworkIPs ];

	// Execute a list of Promise return functions in series
	function UpdateProcess(list) {  
	  var p = Promise.resolve();
	  return list.reduce(function(pacc, fn) {
	    return pacc = pacc.then(fn);
	  }, p);
	}

	UpdateProcess(UpdateSteps);

	// Add these rules turn SuperMesh device to act as TOR Gateway
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p tcp --syn -j REDIRECT --to-ports 9040; sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040; sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --syn -j REDIRECT --to-ports 9040; sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040; sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"; sudo systemctl enable tor; sudo systemctl restart tor');

	res.end('{"msg": "success","result": "result"}');
});

// Update iptabels 4 forwarding
router.get('/disabletor', function(req, res) {
	var Promise = require('bluebird');

	// Promise returning functions to execute
	function UpdateGatewaySettings() {
		var torrc_File = '/opt/SuperMeshData/torrc.data'
		var torrc_Data = ''

		var torrcfs_Read = fs.readFileSync(torrc_File, 'utf8').toString();
		var settings_data = JSON.parse(torrcfs_Read);
		//console.log(JSON.stringify(settings_data.EnableTorGateway, null, 2));

		torrc_Data = {
			"Eth1Addr": settings_data.Eth1Addr,
			"EnableEth1": settings_data.EnableEth1,
			"Wlan0Addr": settings_data.Wlan0Addr,
			"EnableWlan0": settings_data.EnableWlan0,
			"EnableTorGateway": "# "
		}

		//console.log('=========== JSON Stringify ===========');
		//console.log(JSON.stringify(torrc_Data, null, 2))

		// Write update changes to JSON file interfaces.data
		fs.writeFile(torrc_File, JSON.stringify(torrc_Data, null, 2), function (err) {
			if (err) return console.log(err)
				//console.log('======= Setting values from Admin Panel =======')
				//console.log('writing to ' + torrc_File)
				//console.log(JSON.stringify(torrc_Data, null, 2))
			});
		//console.log('>>>>>> Runing 1st')
		return Promise.resolve(1);
	}
	function CheckInterfaceUp(res) {
		var enable_eth1 = '# '
		var enable_wlan0 = '# '

		ifstate.status(function(err, status) {
			var torrcFile = '/opt/SuperMeshData/torrc.data'
			var torrcData = ''

			var torrcfsRead = fs.readFileSync(torrcFile, 'utf8').toString();
			var settingsdata = JSON.parse(torrcfsRead);
			//console.log(JSON.stringify(settingsdata.Eth1Addr, null, 2));
			//console.log(status);

			for (i = 0; i < status.length; i++) {
				if ( status[i].interface == 'eth1' && status[i].state == 'UP' ) {
					console.log(status[i]);
					enable_eth1 = ''
				}
				if ( status[i].interface == 'wlan0' && status[i].state == 'UP' ) {
					console.log(status[i]);
					enable_wlan0 = ''
				}
			}

			torrcData = {
				"Eth1Addr": settingsdata.Eth1Addr,
				"EnableEth1": enable_eth1,
				"Wlan0Addr": settingsdata.Wlan0Addr,
				"EnableWlan0": enable_wlan0,
				"EnableTorGateway": settingsdata.EnableTorGateway
			}

			//console.log(torrcData);
			//console.log('eth1 variable value: ' + enable_eth1);
			//console.log('wlan0 variable value: ' + enable_wlan0);

			fs.writeFile(torrcFile, JSON.stringify(torrcData, null, 2), function (err) {
			if (err) return console.log(err)
				//console.log('======= Setting values for interfaces =======')
				//console.log('writing to ' + torrcFile)
				//console.log(JSON.stringify(torrcData, null, 2))
			});

		});
		//console.log('>>>>>> Runing 2nd')
		return Promise.resolve(res + 1);
	}  
	function getNetworkIPs(res){
		console.log('Getting Network IP...')

		//console.log('>>>>>> Runing 3rd')
		//console.log("result:", res);
		//Execute promissed spanw child process
		SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/torrc.cf; sudo rm /etc/tor/torrc.cf-before-edit');
	}

	var UpdateSteps = [ UpdateGatewaySettings, CheckInterfaceUp, getNetworkIPs ];

	// Execute a list of Promise return functions in series
	function UpdateProcess(list) {  
	  var p = Promise.resolve();
	  return list.reduce(function(pacc, fn) {
	    return pacc = pacc.then(fn);
	  }, p);
	}

	UpdateProcess(UpdateSteps);

	// Add these rules turn SuperMesh device to act as TOR Gateway
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p tcp --syn -j REDIRECT --to-ports 9040; sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040; sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"; sudo systemctl disable tor; sudo systemctl restart tor');

	res.end('{"msg": "success","result": "result"}');
});

// Restart Tor Service
router.get('/restarttor', function(req, res) {
	// Restart Tor service
	SuperMesh.RunCmd('sudo systemctl daemon-reload; sudo systemctl restart tor');

	res.end('{"msg": "success","result": "result"}');
});

module.exports = router;
