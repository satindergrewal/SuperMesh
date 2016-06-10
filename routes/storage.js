var express = require('express');
var router = express.Router();

var fs = require('fs');
var sys = require('sys');
var df = require('node-df');

// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");
var lshw_disk = require("../private/js/lshw_disk.js");

/* GET hostapd settings. */
router.get('/', function(req, res, next) {
  res.render('storage', {title: 'Controle Centre Admin'});
});

router.get('/df', function(req, res, next) {
	var	options = {
		prefixMultiplier: 'GB',
		isDisplayPrefixMultiplier: true,
		precision: 2
	};

	df(options, function (error, response) {
	if (error) { throw error; }
		var dfoutput = JSON.stringify(response, null, 2)
		res.send(dfoutput);
	});
});

router.get('/usbstorageinfo', function(req, res, next) {
	lshw_disk.status(function(err, disk_status) {
		var	options = {
			prefixMultiplier: 'GB',
			isDisplayPrefixMultiplier: true,
			precision: 2
		};

		df(options, function (error, response) {
		if (error) { throw error; }
			var dfoutput = JSON.stringify(response, null, 2)
			var diskJSON = {
				"df": response,
				"usbinfo": disk_status
			}
			res.send(diskJSON);
			//res.send(dfoutput);
		});
		//res.send(disk_status);
	});
});

/* POST to Erase select USB Device. */
router.post('/eraseconnect', function(req, res) {
	console.log('======= req.body =======');
	console.log(req.body);
	console.log(req.body.USBLogicName);

	SuperMesh.RunCmd('sudo umount '+ req.body.USBLogicName + '?; sudo parted -s '+ req.body.USBLogicName + ' mklabel msdos; sudo parted -s '+ req.body.USBLogicName + ' mkpart primary 0% 100%; sudo mkfs.ext4 '+ req.body.USBLogicName + '1');

	res.end('{"msg": "success","result": "result"}');
	
});

/* POST to Disconnect select USB Device. */
router.post('/connect', function(req, res) {
	console.log('======= req.body =======');
	console.log(req.body);
	console.log(req.body.USBLogicName);

	SuperMesh.RunCmd('ls -lh private/system_scripts/');

	res.end('{"msg": "success","result": "result"}');
	
});

/* POST to Disconnect select USB Device. */
router.post('/disconnect', function(req, res) {
	console.log('======= req.body =======');
	console.log(req.body);
	console.log(req.body.USBLogicName);

	SuperMesh.RunCmd('sudo umount '+ req.body.USBLogicName + '?');

	res.end('{"msg": "success","result": "result"}');
	
});

module.exports = router;
