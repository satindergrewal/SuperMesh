var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");

/* GET hostapd settings. */
router.get('/', function(req, res, next) {
  res.render('firewall', {title: 'Controle Centre Admin'});
});

router.get('/getsettings', function(req, res, next) {
	var getipv4fwd = fs.readFileSync('/proc/sys/net/ipv4/ip_forward').toString();
	var getipv6fwd = fs.readFileSync('/proc/sys/net/ipv6/conf/all/forwarding').toString();

	/*//var ifoutput;
	fs.readFile('/proc/sys/net/ipv4/ip_forward', 'utf8', function (err, data) {
	  if (err) throw err;
	  //ifoutput = JSON.parse(data);
	  getipv4fwd = data;
	  console.log(getipv4fwd);
	  //res.send(ifoutput);
	});
	fs.readFile('/proc/sys/net/ipv6/conf/all/forwarding', 'utf8', function (err, data) {
	  if (err) throw err;
	  //ifoutput = JSON.parse(data);
	  getipv6fwd = data;
	  console.log(getipv6fwd);
	  //res.send(ifoutput);
	});*/

	IPtablesSettingsData = {
		"ipv4fwd": getipv4fwd,
		"ipv6fwd": getipv6fwd
	}

	console.log('===>> IPtablesSettings DATA recieved >>');
	console.log('=========== JSON Stringify ===========');
	console.log(JSON.stringify(IPtablesSettingsData, null, 2));

	res.send(IPtablesSettingsData);
});

// Update iptabels 4 forwarding
router.get('/enableipv4fwd', function(req, res) {
	//Enable IPv4 forwarding
	SuperMesh.RunCmd('sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"');
	//Enable Masquerading on eth0 interface, the Internet Interneface
	SuperMesh.RunCmd('sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE');
	
	// Between eth0 (Internet) <-> wlan0 (Local LAN)
	//Forward any packet coming from eth0 (Internet) interface to wlan0 (Access Point) interface
	SuperMesh.RunCmd('sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT');
	//Forward any packet coming from wlan0 (Access Point) interface to eth0 (Internet) interface
	SuperMesh.RunCmd('sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT');

	// Between eth0 (Internet) <-> eth1 (Local LAN)
	//Forward any packet coming from eth0 (Internet) interface to eth1 (Access Point) interface
	SuperMesh.RunCmd('sudo iptables -A FORWARD -i eth0 -o eth1 -m state --state RELATED,ESTABLISHED -j ACCEPT');
	//Forward any packet coming from eth1 (Access Point) interface to eth0 (Internet) interface
	SuperMesh.RunCmd('sudo iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT');
	
	// Between wlan1 (Internet) <-> wlan0 (Local LAN)
	//Forward any packet coming from wlan1 (Internet) interface to wlan0 (Access Point) interface
	SuperMesh.RunCmd('sudo iptables -A FORWARD -i wlan1 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT');
	//Forward any packet coming from wlan0 (Access Point) interface to wlan1 (Internet) interface
	SuperMesh.RunCmd('sudo iptables -A FORWARD -i wlan0 -o wlan1 -j ACCEPT');
	
	//Save updated iptables rules to ipv4 file
	SuperMesh.RunCmd('sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"')
	
	res.end('{"msg": "success","result": "result"}');
});

// Update iptabels 4 forwarding
router.get('/disableipv4fwd', function(req, res) {
	//Enable IPv4 forwarding
	SuperMesh.RunCmd('sudo sh -c "echo 0 > /proc/sys/net/ipv4/ip_forward"');

	// Between eth0 (Internet) <-> wlan0 (Local LAN)
	//Forward any packet coming from eth0 (Internet) interface to wlan0 (Access Point) interface
	SuperMesh.RunCmd('sudo iptables -D FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT');
	//Forward any packet coming from wlan0 (Access Point) interface to eth0 (Internet) interface
	SuperMesh.RunCmd('sudo iptables -D FORWARD -i wlan0 -o eth0 -j ACCEPT');

	// Between eth0 (Internet) <-> eth1 (Local LAN)
	//Forward any packet coming from eth0 (Internet) interface to eth1 (Access Point) interface
	SuperMesh.RunCmd('sudo iptables -D FORWARD -i eth0 -o eth1 -m state --state RELATED,ESTABLISHED -j ACCEPT');
	//Forward any packet coming from eth1 (Access Point) interface to eth0 (Internet) interface
	SuperMesh.RunCmd('sudo iptables -D FORWARD -i eth1 -o eth0 -j ACCEPT');
	
	// Between wlan1 (Internet) <-> wlan0 (Local LAN)
	//Forward any packet coming from wlan1 (Internet) interface to wlan0 (Access Point) interface
	SuperMesh.RunCmd('sudo iptables -D FORWARD -i wlan1 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT');
	//Forward any packet coming from wlan0 (Access Point) interface to wlan1 (Internet) interface
	SuperMesh.RunCmd('sudo iptables -D FORWARD -i wlan0 -o wlan1 -j ACCEPT');
	
	//Save updated iptables rules to ipv4 file
	SuperMesh.RunCmd('sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"')
	
	res.end('{"msg": "success","result": "result"}');
});


// Restart IPtabls4 service
router.get('/restartiptables', function(req, res, next) {
	SuperMesh.RunCmd('sudo systemctl daemon-reload');
	SuperMesh.RunCmd('sudo systemctl restart iptables');
	res.send('{"msg": "success","result": "result"}');
});

module.exports = router;
