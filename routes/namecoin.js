var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");
var nmcconf = require("../private/js/nmcconf.js");

/* GET hostapd settings. */
router.get('/', function(req, res, next) {
  res.render('namecoin', {title: 'Controle Centre Admin'});
});

router.get('/getsettings', function(req, res, next) {
	nmcconf.status(function(err, nmcsettings) {
		console.log(nmcsettings);
		res.send(nmcsettings);
	});
});


/* POST to Update Namecoin Settings. */
router.post('/update', function(req, res) {
	var Promise = require('bluebird');

	// Promise returning functions to execute
	function UpdateNMCSettings() {
		var NMC_File = '/opt/SuperMeshData/namecoin.data'
		var NMC_Data = ''

		var NMCfs_Read = fs.readFileSync(NMC_File, 'utf8').toString();
		var settings_data = JSON.parse(NMCfs_Read);
		//console.log(JSON.stringify(settings_data.EnableTorGateway, null, 2));

		//console.log('======= req.body =======');
		//console.log(req.body);

		NMC_Data = {
			"namecoin_rpcuser": req.body.rpc_user,
			"namecoin_rpcpassword": req.body.rpc_pass,
			"enable_namecoin_service": req.body.enable_Namecoin_service
		}

		//console.log('=========== JSON Stringify ===========');
		//console.log(JSON.stringify(NMC_Data, null, 2))

		// Write update changes to JSON file interfaces.data
		fs.writeFile(NMC_File, JSON.stringify(NMC_Data, null, 2), function (err) {
			if (err) return console.log(err)
				//console.log('======= Setting values from Admin Panel =======')
				//console.log('writing to ' + NMC_File)
				//console.log(JSON.stringify(NMC_Data, null, 2))
			});
		//console.log('>>>>>> Runing 1st')
		return Promise.resolve(1);
	}
	function SetupNMCService(res){
		console.log('Getting Network IP...')

		//console.log('>>>>>> Runing 3rd')
		//console.log("result:", res);
		//Execute promissed spanw child process
		SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/torrc.cf; sudo rm /etc/tor/torrc.cf-before-edit');
	}

	var UpdateSteps = [ UpdateNMCSettings, SetupNMCService ];

	// Execute a list of Promise return functions in series
	function UpdateProcess(list) {  
	  var p = Promise.resolve();
	  return list.reduce(function(pacc, fn) {
	    return pacc = pacc.then(fn);
	  }, p);
	}

	UpdateProcess(UpdateSteps);

	if ( req.body.enable_Namecoin_service === 'true' ) {
		// Enable TOR Proxy and Gateway
		// TOR Service Rules
		// Add these rules to allow TOR Transparent Proxy
		//SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
		//SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 9050 -j REDIRECT --to-ports 9050');

		// Add these rules turn SuperMesh device to act as TOR Gateway
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p tcp --syn -j REDIRECT --to-ports 9040; sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040; sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --syn -j REDIRECT --to-ports 9040; sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040; sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"; sudo systemctl enable tor; sudo systemctl restart tor');

	} else if ( req.body.enable_Namecoin_service === 'false' ) {
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


// Enable Namecoin Service
router.get('/enablenmc', function(req, res) {
	// Enable Namecoin service to start at boot time, then start Namecoin service
	SuperMesh.RunCmd('sudo systemctl daemon-reload; sudo systemctl enable namecoin; sudo systemctl start namecoin');

	res.end('{"msg": "success","result": "result"}');
});

// Disable Namecoin Service
router.get('/disablenmc', function(req, res) {
	// Disable Namecoin service to start at boot time, then stop Namecoin service
	SuperMesh.RunCmd('sudo systemctl daemon-reload; sudo systemctl disable namecoin; sudo systemctl stop namecoin');

	res.end('{"msg": "success","result": "result"}');
});

// Restart Namecoin Service
router.get('/restartnmc', function(req, res) {
	// Restart Namecoin service
	SuperMesh.RunCmd('sudo systemctl daemon-reload; sudo systemctl restart namecoin');

	res.end('{"msg": "success","result": "result"}');
});

module.exports = router;
