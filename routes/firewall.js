var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');
var Promise = require('bluebird');

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");

/* GET hostapd settings. */
router.get('/', function(req, res, next) {
  res.render('firewall', {title: 'Controle Centre Admin'});
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
	var sysctlFile = '/opt/SuperMeshData/sysctl_conf.data'
	var sysctlData = ''

	console.log('======= req.body =======');
	console.log(req.body);

	sysctlData = {
		"ipv4fwd_enable_disable": (req.body.iptables4_enable_disable === "false") ? "0" : "1",
		"ipv6fwd_enable_disable": (req.body.iptables6_enable_disable === "false") ? "0" : "1"
	}

	console.log('=========== JSON Stringify ===========');
	console.log(JSON.stringify(sysctlData, null, 2))

	// Write update changes to JSON file interfaces.data
	fs.writeFile(sysctlFile, JSON.stringify(sysctlData, null, 2), function (err) {
		if (err) return console.log(err)
			//console.log(JSON.stringify(sysctlData, null, 2))
			//console.log('writing to ' + sysctlFile)

			//Execute promissed spanw child process
			SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/sysctl_conf.cf');
			SuperMesh.RunCmd('sudo rm /etc/sysctl.conf.cf-before-edit');
		});


	if ( req.body.iptables4_enable_disable === 'true' ) {
		SuperMesh.RunCmd('sudo private/system_scripts/enable_firewall_rules.sh');
	} else if ( req.body.iptables4_enable_disable === 'false' ) {
		SuperMesh.RunCmd('sudo private/system_scripts/disable_firewall_rules.sh');
	}
	
	res.end('{"msg": "success","result": "result"}');
});


// Enable iptabels 4 forwarding
router.get('/enableipv4fwd', function(req, res) {
	SuperMesh.RunCmd('sudo private/system_scripts/enable_firewall_rules.sh');
	
	res.end('{"msg": "success","result": "result"}');
});

// Disable iptabels 4 forwarding
router.get('/disableipv4fwd', function(req, res) {
	SuperMesh.RunCmd('sudo private/system_scripts/disable_firewall_rules.sh');
	
	res.end('{"msg": "success","result": "result"}');
});

module.exports = router;
