var fs = require('fs');
var SuperMesh = require("./app_functions.js");
var nmcconf = require("./nmcconf.js");



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

	/*var NMCGetSettings_file = fs.readFileSync('/opt/SuperMeshData/namecoin.data', 'utf8').toString();
	var settings_getData = JSON.parse(NMCGetSettings_file);
	console.log(settings_getData.enable_namecoin_service);
	tempdata = nmcsettings.push(settings_getData);*/
});
