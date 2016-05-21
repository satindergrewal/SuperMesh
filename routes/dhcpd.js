var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");

/* GET network settings. */
router.get('/', function(req, res, next) {
  res.render('dhcpd', {title: 'Controle Centre Admin'});
});

router.get('/getsettings', function(req, res, next) {

	var ifoutput;
	fs.readFile('/opt/SuperMeshData/dhcpd_conf.data', 'utf8', function (err, data) {
	  if (err) throw err;
	  ifoutput = JSON.parse(data);
	  res.send(ifoutput);
	});
});

/* POST to Update Access Point Settings. */
router.post('/update', function(req, res) {
	var DHCPDFile = '/opt/SuperMeshData/dhcpd_conf.data'
	var DHCPDData = ''

	/*fs.readFile(DHCPDFile, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		console.log('===== File Read Output ======');
		console.log(JSON.stringify(data, null, 2));
	});*/

	//console.log('======= req.body =======');
	//console.log(req.body.dhcpd_primary_dns);
	//console.log(req.body.dhcpd_secondary_dns);
	//console.log(req.body.dhcpd_subnet);
	//console.log(req.body.dhcpd_netmask);
	//console.log(req.body.dhcpd_range_start);
	//console.log(req.body.dhcpd_range_end);
	//console.log(req.body.dhcpd_primary_router);
	//console.log(req.body.dhcpd_secondary_router);

	DHCPDData = {
		"DNS": [
		    {
		      "dns1": req.body.wlan0_dhcpd_primary_dns,
		      "dns2": req.body.eth1_dhcpd_primary_dns
		    }
		  ],
		  "wlan0_DefaultLeaseTime": "600",
		  "wlan0_MaxLeaseTime": "7200",
		  "wlan0_Subnet": req.body.wlan0_dhcpd_subnet,
		  "wlan0_BroadcastAddr": req.body.wlan0_dhcpd_broadcast_addr,
		  "wlan0_Netmask": req.body.wlan0_dhcpd_netmask,
		  "wlan0_Range": [
		    {
		      "start": req.body.wlan0_dhcpd_range_start,
		      "end": req.body.wlan0_dhcpd_range_end
		    }
		  ],
		  "eth1_DefaultLeaseTime": "600",
		  "eth1_MaxLeaseTime": "7200",
		  "eth1_Subnet": req.body.eth1_dhcpd_subnet,
		  "eth1_BroadcastAddr": req.body.eth1_dhcpd_broadcast_addr,
		  "eth1_Netmask": req.body.eth1_dhcpd_netmask,
		  "eth1_Range": [
		    {
		      "start": req.body.eth1_dhcpd_range_start,
		      "end": req.body.eth1_dhcpd_range_end
		    }
		  ],
		  "Routers": [
		    {
		      "router1": req.body.wlan0_dhcpd_primary_router,
		      "router2": req.body.eth1_dhcpd_primary_router
		    }
		  ],
		  "INTERFACES": [
		    {
		      "iface1": "wlan0",
		      "iface2": "eth1"
		    }
		  ]
		}

	console.log('===>> DHCPD DATA recieved >>')
	console.log('=========== JSON Stringify ===========');
	console.log(JSON.stringify(DHCPDData, null, 2))

	// Write update changes to JSON file interfaces.data
	fs.writeFile(DHCPDFile, JSON.stringify(DHCPDData, null, 2), function (err) {
		if (err) return console.log(err)
			console.log(JSON.stringify(DHCPDData, null, 2));
			console.log('writing to ' + DHCPDFile);

			//Execute promissed spanw child process
			SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/dhcpd_conf.cf');
			SuperMesh.RunCmd('sudo systemctl daemon-reload');
			SuperMesh.RunCmd('sudo systemctl restart isc-dhcp-server');
			SuperMesh.RunCmd('sudo systemctl restart hostapd');
		});
	
	res.end('{"msg": "success","result": "result"}');
});


// Restart DHCP Service.
router.get('/restartdhcpd', function(req, res, next) {
	//Execute promissed spanw child process
	SuperMesh.RunCmd('sudo systemctl daemon-reload');
	SuperMesh.RunCmd('sudo systemctl restart isc-dhcp-server');
	SuperMesh.RunCmd('sudo systemctl restart hostapd');
	res.send('{"msg": "success","result": "result"}');
});

module.exports = router;
