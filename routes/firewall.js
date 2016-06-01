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
		//Enable IPv4 forwarding
		SuperMesh.RunCmd('sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"');
		//Enable Masquerading on eth0 interface, the Internet Interneface
		SuperMesh.RunCmd('sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE');
		//Enable Masquerading on eth0 interface, the Internet Interneface
		SuperMesh.RunCmd('sudo iptables -t nat -A POSTROUTING -o wlan1 -j MASQUERADE');
		
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

		// Between wlan1 (Internet) <-> eth1 (Local LAN)
		//Forward any packet coming from wlan1 (Internet) interface to eth1 (Access Point) interface
		SuperMesh.RunCmd('sudo iptables -A FORWARD -i wlan1 -o eth1 -m state --state RELATED,ESTABLISHED -j ACCEPT');
		//Forward any packet coming from eth1 (Access Point) interface to wlan1 (Internet) interface
		SuperMesh.RunCmd('sudo iptables -A FORWARD -i eth1 -o wlan1 -j ACCEPT');

		//Mre NAT rules
		//Add firewall rule to allow access to SSH through internal network from where the home users connect to. Both LAN (eth1) and wireless (wlan0)
		SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 22 -j REDIRECT --to-ports 22');
		SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 22 -j REDIRECT --to-ports 22');

		//Add firewall rule to allow internal users to do DNS queries
		SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p udp --dport 53 -j REDIRECT --to-ports 53');
		SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 53 -j REDIRECT --to-ports 53');

		//Make sure SuperMesh web interface is ALWAYS accessible to internal users
		SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 3000 -j REDIRECT --to-ports 3000');
		SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 3000 -j REDIRECT --to-ports 3000');

		SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
		SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
		
		//Save updated iptables rules to ipv4 file
		SuperMesh.RunCmd('sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"')
	} else if ( req.body.iptables4_enable_disable === 'false' ) {
		//Enable IPv4 forwarding
		SuperMesh.RunCmd('sudo sh -c "echo 0 > /proc/sys/net/ipv4/ip_forward"');
		//Enable Masquerading on eth0 interface, the Internet Interneface
		SuperMesh.RunCmd('sudo iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE');
		//Enable Masquerading on eth0 interface, the Internet Interneface
		SuperMesh.RunCmd('sudo iptables -t nat -D POSTROUTING -o wlan1 -j MASQUERADE');

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

		// Between wlan1 (Internet) <-> eth1 (Local LAN)
		//Forward any packet coming from wlan1 (Internet) interface to eth1 (Access Point) interface
		SuperMesh.RunCmd('sudo iptables -D FORWARD -i wlan1 -o eth1 -m state --state RELATED,ESTABLISHED -j ACCEPT');
		//Forward any packet coming from eth1 (Access Point) interface to wlan1 (Internet) interface
		SuperMesh.RunCmd('sudo iptables -D FORWARD -i eth1 -o wlan1 -j ACCEPT');

		//Mre NAT rules
		//Add firewall rule to allow access to SSH through internal network from where the home users connect to. Both LAN (eth1) and wireless (wlan0)
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p tcp --dport 22 -j REDIRECT --to-ports 22');
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --dport 22 -j REDIRECT --to-ports 22');

		//Add firewall rule to allow internal users to do DNS queries
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p udp --dport 53 -j REDIRECT --to-ports 53');
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i wlan0 -p udp --dport 53 -j REDIRECT --to-ports 53');

		//Make sure SuperMesh web interface is ALWAYS accessible to internal users
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p tcp --dport 3000 -j REDIRECT --to-ports 3000');
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --dport 3000 -j REDIRECT --to-ports 3000');

		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
		SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i wlan0 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
		
		//Save updated iptables rules to ipv4 file
		SuperMesh.RunCmd('sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"')
	}
	
	res.end('{"msg": "success","result": "result"}');
});


// Update iptabels 4 forwarding
router.get('/enableipv4fwd', function(req, res) {
	//Enable IPv4 forwarding
	SuperMesh.RunCmd('sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"');
	//Enable Masquerading on eth0 interface, the Internet Interneface
	SuperMesh.RunCmd('sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE');
	//Enable Masquerading on eth0 interface, the Internet Interneface
	SuperMesh.RunCmd('sudo iptables -t nat -A POSTROUTING -o wlan1 -j MASQUERADE');
	
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

	// Between wlan1 (Internet) <-> eth1 (Local LAN)
	//Forward any packet coming from wlan1 (Internet) interface to eth1 (Access Point) interface
	SuperMesh.RunCmd('sudo iptables -A FORWARD -i wlan1 -o eth1 -m state --state RELATED,ESTABLISHED -j ACCEPT');
	//Forward any packet coming from eth1 (Access Point) interface to wlan1 (Internet) interface
	SuperMesh.RunCmd('sudo iptables -A FORWARD -i eth1 -o wlan1 -j ACCEPT');

	//Mre NAT rules
	//Add firewall rule to allow access to SSH through internal network from where the home users connect to. Both LAN (eth1) and wireless (wlan0)
	SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 22 -j REDIRECT --to-ports 22');
	SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 22 -j REDIRECT --to-ports 22');

	//Add firewall rule to allow internal users to do DNS queries
	SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p udp --dport 53 -j REDIRECT --to-ports 53');
	SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 53 -j REDIRECT --to-ports 53');

	//Make sure SuperMesh web interface is ALWAYS accessible to internal users
	SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 3000 -j REDIRECT --to-ports 3000');
	SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 3000 -j REDIRECT --to-ports 3000');

	//Enable Tor Proxy port
	SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i eth1 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
	SuperMesh.RunCmd('sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
	
	//Save updated iptables rules to ipv4 file
	SuperMesh.RunCmd('sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"')
	
	res.end('{"msg": "success","result": "result"}');
});

// Update iptabels 4 forwarding
router.get('/disableipv4fwd', function(req, res) {
	//Enable IPv4 forwarding
	SuperMesh.RunCmd('sudo sh -c "echo 0 > /proc/sys/net/ipv4/ip_forward"');
	//Enable Masquerading on eth0 interface, the Internet Interneface
	SuperMesh.RunCmd('sudo iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE');
	//Enable Masquerading on eth0 interface, the Internet Interneface
	SuperMesh.RunCmd('sudo iptables -t nat -D POSTROUTING -o wlan1 -j MASQUERADE');

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

	// Between wlan1 (Internet) <-> eth1 (Local LAN)
	//Forward any packet coming from wlan1 (Internet) interface to eth1 (Access Point) interface
	SuperMesh.RunCmd('sudo iptables -D FORWARD -i wlan1 -o eth1 -m state --state RELATED,ESTABLISHED -j ACCEPT');
	//Forward any packet coming from eth1 (Access Point) interface to wlan1 (Internet) interface
	SuperMesh.RunCmd('sudo iptables -D FORWARD -i eth1 -o wlan1 -j ACCEPT');
	
	//Mre NAT rules
	//Add firewall rule to allow access to SSH through internal network from where the home users connect to. Both LAN (eth1) and wireless (wlan0)
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p tcp --dport 22 -j REDIRECT --to-ports 22');
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --dport 22 -j REDIRECT --to-ports 22');

	//Add firewall rule to allow internal users to do DNS queries
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p udp --dport 53 -j REDIRECT --to-ports 53');
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i wlan0 -p udp --dport 53 -j REDIRECT --to-ports 53');

	//Make sure SuperMesh web interface is ALWAYS accessible to internal users
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p tcp --dport 3000 -j REDIRECT --to-ports 3000');
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i wlan0 -p tcp --dport 3000 -j REDIRECT --to-ports 3000');

	//Disable Tor Proxy port
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i eth1 -p udp --dport 9050 -j REDIRECT --to-ports 9050');
	SuperMesh.RunCmd('sudo iptables -t nat -D PREROUTING -i wlan0 -p udp --dport 9050 -j REDIRECT --to-ports 9050');

	//Save updated iptables rules to ipv4 file
	SuperMesh.RunCmd('sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"')
	
	res.end('{"msg": "success","result": "result"}');
});

module.exports = router;
