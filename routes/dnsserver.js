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
	var onion_value = ''

	//console.log('======= req.body =======');
	//console.log(req.body);
	//console.log('onion: '+req.body.onion_enable_disable);
	//console.log('bit: '+req.body.bit_enable_disable);
	//console.log('eth: '+req.body.eth_enable_disable);
	//console.log('p2p: '+req.body.p2p_enable_disable);

	PDNSRData = {
		  "onion": (req.body.onion_enable_disable === 'true' ) ? ",onion.=127.0.0.1:5334" : "",
		  "onion_enable_disable": (req.body.onion_enable_disable === 'true' ) ? true : false,
		  "bit": (req.body.bit_enable_disable === 'true' ) ? ",bit.=127.0.0.1:5333" : "",
		  "bit_enable_disable": (req.body.bit_enable_disable === 'true' ) ? true : false,
		  "eth": (req.body.eth_enable_disable === 'true' ) ? ",eth.=127.0.0.1:5333" : "",
		  "eth_enable_disable": (req.body.eth_enable_disable === 'true' ) ? true : false,
		  "p2p": (req.body.p2p_enable_disable === 'true' ) ? ",p2p.=127.0.0.1:5333" : "",
		  "p2p_enable_disable": (req.body.p2p_enable_disable === 'true' ) ? true : false
		}

	console.log('=========== JSON Stringify ===========');
	console.log(JSON.stringify(PDNSRData, null, 2))

	// Write update changes to JSON file interfaces.data
	fs.writeFile(PDNSRFile, JSON.stringify(PDNSRData, null, 2), function (err) {
		if (err) return console.log(err)
			//console.log(JSON.stringify(PDNSRData, null, 2))
			//console.log('writing to ' + PDNSRFile)

			//Execute promissed spanw child process
			SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/recursor_conf.cf');
		});
		

	res.end('{"msg": "success","result": "result"}');
});

module.exports = router;
