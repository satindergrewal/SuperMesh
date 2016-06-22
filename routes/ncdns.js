var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");
var nmcconf = require("../private/js/nmcconf.js");

/* GET hostapd settings. */
router.get('/', function(req, res, next) {
  res.render('ncdns', {title: 'Controle Centre Admin'});
});

router.get('/getsettings', function(req, res, next) {
	nmcconf.status(function(err, nmcsettings) {
		console.log(nmcsettings);
		var NMCGetSettings_file = fs.readFileSync('/opt/SuperMeshData/namecoin.data', 'utf8').toString();
		var settings_getData = JSON.parse(NMCGetSettings_file);
		console.log(settings_getData.enable_namecoin_service);
		tempdata = nmcsettings.push(settings_getData);
		res.send(nmcsettings);
	});
});


/* POST to Update NCDNS Settings. */
router.post('/update', function(req, res) {
	var Promise = require('bluebird');

	// Promise returning functions to execute
	function UpdateNCDNSSettings() {
		nmcconf.status(function(err, nmcsettings) {
			console.log(nmcsettings);
			
			var NMC_File = '/opt/SuperMeshData/namecoin.data'
			var NMC_Data = ''

			NMC_Data = {
				"namecoin_rpcuser": nmcsettings[0].rpcuser,
				"namecoin_rpcpassword": nmcsettings[0].rpcpass,
				"enable_namecoin_service": true
			}

			// Write update changes to JSON file interfaces.data
			fs.writeFile(NMC_File, JSON.stringify(NMC_Data, null, 2), function (err) {
				if (err) return console.log(err)
					//console.log('======= Setting values from Admin Panel =======')
					//console.log('writing to ' + NMC_File)
					//console.log(JSON.stringify(NMC_Data, null, 2))
				});
		});
		return Promise.resolve(1);
	}
	function SetupNCDNSService(res){
		console.log('Syncing NCDNS settings data with Namecoin Settings...')

		//console.log('>>>>>> Runing 3rd')
		//console.log("result:", res);
		//Execute promissed spanw child process
		SuperMesh.RunCmd('sudo cf-agent -K /opt/SuperMesh/private/system_scripts/ncdns_conf.cf; sudo systemctl restart ncdns; sudo rm /etc/ncdns/ncdns.conf.cf-before-edit;');
	}

	var UpdateSteps = [ UpdateNCDNSSettings, SetupNCDNSService ];

	// Execute a list of Promise return functions in series
	function UpdateProcess(list) {  
	  var p = Promise.resolve();
	  return list.reduce(function(pacc, fn) {
	    return pacc = pacc.then(fn);
	  }, p);
	}

	UpdateProcess(UpdateSteps);

	if ( req.body.enable_ncdns_service === 'true' ) {
		//console.log('-- enable disable ncdns service is true --');
		//console.log(req.body.enable_ncdns_service);
		// Enable NCDNS Service
			console.log('==> Enabling NCDNS to start at system boot, and starting NCDNS Service...')
			SuperMesh.RunCmd('sudo systemctl daemon-reload; sudo systemctl enable ncdns; sudo systemctl start ncdns');
	} else if ( req.body.enable_ncdns_service === 'false' ) {
		//console.log('-- enable disable ncdns service is false --');
		//console.log(req.body.enable_ncdns_service);
		// Disable NCDNS Service
			console.log('==> Disabling NCDNS to start at system boot, and stopting NCDNS Service...')
			SuperMesh.RunCmd('sudo systemctl daemon-reload; sudo systemctl disable ncdns; sudo systemctl stop ncdns');
	}

	res.end('{"msg": "success","result": "result"}');
	
});


// Enable NCDNS Service
router.get('/enablencdns', function(req, res) {
	// Enable NCDNS service to start at boot time, then start NCDNS service
	SuperMesh.RunCmd('sudo systemctl daemon-reload; sudo systemctl enable ncdns; sudo systemctl start ncdns');

	res.end('{"msg": "success","result": "result"}');
});

// Disable NCDNS Service
router.get('/disablencdns', function(req, res) {
	// Disable NCDNS service to start at boot time, then stop NCDNS service
	SuperMesh.RunCmd('sudo systemctl daemon-reload; sudo systemctl disable ncdns; sudo systemctl stop ncdns');

	res.end('{"msg": "success","result": "result"}');
});

// Restart NCDNS Service
router.get('/restartncdns', function(req, res) {
	// Restart NCDNS service
	SuperMesh.RunCmd('sudo systemctl daemon-reload; sudo systemctl restart ncdns');

	res.end('{"msg": "success","result": "result"}');
});

module.exports = router;
