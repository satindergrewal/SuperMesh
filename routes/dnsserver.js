var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");

/* GET hostapd settings. */
router.get('/', function(req, res, next) {
  res.render('dnsserver', {title: 'Controle Centre Admin'});
});

router.get('/getsettings', function(req, res, next) {

	var ifoutput;
	fs.readFile('/opt/SuperMeshData/recursor_conf.data', 'utf8', function (err, data) {
	  if (err) throw err;
	  ifoutput = JSON.parse(data);
	  res.send(ifoutput);
	});
});


/* POST to Update IPTables Settings. */
router.post('/update', function(req, res) {
	var PDNSRFile = '/opt/SuperMeshData/recursor_conf.data'
	var PDNSRData = ''

	console.log('======= req.body =======');
	console.log(req.body);

	PDNSRData = {
		"ipv4fwd_enable_disable": (req.body.iptables4_enable_disable === "false") ? "0" : "1",
		"ipv6fwd_enable_disable": (req.body.iptables6_enable_disable === "false") ? "0" : "1"
	}

	console.log('=========== JSON Stringify ===========');
	console.log(JSON.stringify(PDNSRData, null, 2))

	// Write update changes to JSON file interfaces.data
	fs.writeFile(PDNSRFile, JSON.stringify(PDNSRData, null, 2), function (err) {
		if (err) return console.log(err)
			//console.log(JSON.stringify(PDNSRData, null, 2))
			//console.log('writing to ' + PDNSRFile)

			//Execute promissed spanw child process
			SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/recursor_config.cf; sudo rm /etc/powerdns/recursor.conf.cf-before-edit');
		});

	res.end('{"msg": "success","result": "result"}');
});

module.exports = router;
