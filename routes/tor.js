var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");

/* GET hostapd settings. */
router.get('/', function(req, res, next) {
  res.render('tor', {title: 'Controle Centre Admin'});
});

router.get('/getsettings', function(req, res, next) {
	var getipv4fwd = fs.readFileSync('/proc/sys/net/ipv4/ip_forward').toString();
	var getipv6fwd = fs.readFileSync('/proc/sys/net/ipv6/conf/all/forwarding').toString();

	//Demo values
	//var getipv4fwd = '1'
	//var getipv6fwd = '0'

	IPtablesSettingsData = {
		"ipv4fwd": getipv4fwd,
		"ipv6fwd": getipv6fwd
	}

	console.log('===>> IPtablesSettings DATA recieved >>');
	console.log('=========== JSON Stringify ===========');
	console.log(JSON.stringify(IPtablesSettingsData, null, 2));

	res.send(IPtablesSettingsData);
});


/* POST to Update IPTables Settings. */
router.post('/update', function(req, res) {
	var torrcFile = '/opt/SuperMeshData/torrc.data'
	var torrcData = ''

	console.log('======= req.body =======');
	console.log(req.body);

	torrcData = {
		"EnableEth1": true,
		"EnableWlan0": true,
		"EnableTorGateway" true
	}{
		"ipv4fwd_enable_disable": (req.body.iptables4_enable_disable === "false") ? "0" : "1",
		"ipv6fwd_enable_disable": (req.body.iptables6_enable_disable === "false") ? "0" : "1"
	}

	console.log('=========== JSON Stringify ===========');
	console.log(JSON.stringify(torrcData, null, 2))

	// Write update changes to JSON file interfaces.data
	/*fs.writeFile(torrcFile, JSON.stringify(torrcData, null, 2), function (err) {
		if (err) return console.log(err)
			//console.log(JSON.stringify(torrcData, null, 2))
			//console.log('writing to ' + torrcFile)

			//Execute promissed spanw child process
			SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/sysctl_conf.cf');
			SuperMesh.RunCmd('sudo rm /etc/sysctl.conf.cf-before-edit');
		});*/


	if ( req.body.iptables4_enable_disable === 'true' ) {
		// Enable TOR Proxy and Gateway
		// TOR Service Rules
		// Add these rules to allow TOR Transparent Proxy
		SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
		SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 9050 -j REDIRECT --to-ports 9050');

		// Add these rules turn SuperMesh device to act as TOR Gateway
		SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --syn -j REDIRECT --to-ports 9040');
		SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040');
		
		//Save updated iptables rules to ipv4 file
		SuperMesh.RunCmd('sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"')
	} else if ( req.body.iptables4_enable_disable === 'false' ) {
		// Enable TOR Proxy and Gateway
		// TOR Service Rules
		// Add these rules to allow TOR Transparent Proxy
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i wlan0 -p udp --dport 9050 -j REDIRECT --to-ports 9050');

		// Add these rules turn SuperMesh device to act as TOR Gateway
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p tcp --syn -j REDIRECT --to-ports 9040');
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040');
		
		//Save updated iptables rules to ipv4 file
		SuperMesh.RunCmd('sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"')
	}
	
	res.end('{"msg": "success","result": "result"}');
});


// Update iptabels 4 forwarding
router.get('/enabletor', function(req, res) {
	// Enable TOR Proxy and Gateway
	// TOR Service Rules
	// Add these rules to allow TOR Transparent Proxy
	SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
	SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 9050 -j REDIRECT --to-ports 9050');

	// Add these rules turn SuperMesh device to act as TOR Gateway
	SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --syn -j REDIRECT --to-ports 9040');
	SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040');
	
	//Save updated iptables rules to ipv4 file
	SuperMesh.RunCmd('sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"')
	
	res.end('{"msg": "success","result": "result"}');
});

// Update iptabels 4 forwarding
router.get('/disabletor', function(req, res) {
	// Disable TOR Proxy and Gateway
	// TOR Service Rules
	// Add these rules to allow TOR Transparent Proxy
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i wlan0 -p udp --dport 9050 -j REDIRECT --to-ports 9050');

	// Add these rules turn SuperMesh device to act as TOR Gateway
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p tcp --syn -j REDIRECT --to-ports 9040');
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --syn -j REDIRECT --to-ports 9040');

	//Save updated iptables rules to ipv4 file
	SuperMesh.RunCmd('sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"')
	
	res.end('{"msg": "success","result": "result"}');
});

module.exports = router;
