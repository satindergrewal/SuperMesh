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
		var NMCGetSettings_file = fs.readFileSync('/opt/SuperMeshData/namecoin.data', 'utf8').toString();
		var settings_getData = JSON.parse(NMCGetSettings_file);
		console.log(settings_getData.enable_namecoin_service);
		tempdata = nmcsettings.push(settings_getData);
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

		//var NMCfs_Read = fs.readFileSync(NMC_File, 'utf8').toString();
		//var settings_data = JSON.parse(NMCfs_Read);
		//console.log('--- FS Read Data ---')
		//console.log(JSON.stringify(settings_data));
		//console.log(JSON.stringify(settings_data.EnableTorGateway, null, 2));

		/*fs.readFile(NMC_File, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		console.log('--- FS Read Data ---')
		console.log(JSON.stringify(data, null, 2));
		});*/

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
		SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/namecoin_conf.cf; sudo systemctl restart namecoin; sudo rm /media/usb0/namecoin/namecoin.conf.cf-before-edit;');
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
		//console.log('-- enable disable nmc service is true --');
		//console.log(req.body.enable_Namecoin_service);
		// Enable Namecoin Service
		
		var NMCtrue_read = fs.readFileSync('/opt/SuperMeshData/namecoin.data', 'utf8').toString();
		var settingstrue_data = JSON.parse(NMCtrue_read);
		if ( settingstrue_data.enable_namecoin_service === 'true' ) {
			console.log('==> No action done. Namecoin is already Enabled.');
		} else {
			console.log('==> Enabling Namecoin to start at system boot, and starting Namecoin Service...')
			SuperMesh.RunCmd('sudo systemctl daemon-reload; sudo systemctl enable namecoin; sudo systemctl start namecoin');
		}
		//console.log('--- FS Read Data ---')
		//console.log(JSON.stringify(settingstrue_data));
		//console.log(JSON.stringify(settingstrue_data.enable_namecoin_service, null, 2));

	} else if ( req.body.enable_Namecoin_service === 'false' ) {
		//console.log('-- enable disable nmc service is false --');
		//console.log(req.body.enable_Namecoin_service);
		// Disable Namecoin Service
		var NMCfalse_read = fs.readFileSync('/opt/SuperMeshData/namecoin.data', 'utf8').toString();
		var settingsfalse_data = JSON.parse(NMCfalse_read);
		if ( settingsfalse_data.enable_namecoin_service === 'false' ) {
			console.log('==> No action done. Namecoin is already Disabled.');
			SuperMesh.RunCmd('sudo systemctl daemon-reload; sudo systemctl stop namecoin');
		} else {
			console.log('==> Disabling Namecoin to start at system boot, and stopting Namecoin Service...')
			SuperMesh.RunCmd('sudo systemctl daemon-reload; sudo systemctl disable namecoin; sudo systemctl stop namecoin');
		}
				
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
