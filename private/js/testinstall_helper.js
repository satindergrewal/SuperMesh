var fs = require('fs');
var SuperMesh = require("./app_functions.js");
var lshw = require("./lshw.js");



lshw.status(function(err, status) {
	//console.log(status);


	var APFile = '/opt/SuperMeshData/hostapd_conf.data'
	var APData = ''
	var tempData = JSON.parse(fs.readFileSync(APFile, 'utf8'));
	console.log(tempData);
	var APDriver = ''

	for (i = 0; i < status.length; i++) {
		//console.log(status[i]);
		if ( status[i].network === 'wlan0' ) {
			if ( status[i].driver === 'brcmfmac' ) {
				console.log(status[i].driver);
				APDriver = 'nl80211'
				console.log(APDriver);
			} else if ( status[i].driver === 'rtl8192cu' ) {
				console.log(status[i].driver);
				APDriver = 'rtl871xdrv'
				console.log(APDriver);
			} else {
				console.log(status[i].driver);
				APDriver = 'nl80211'
				console.log(APDriver);
			}
		}
	}

	APData = {
	  "wlan_Interface": tempData.wlan_Interface,
	  "AP_SSID": tempData.AP_SSID,
	  "Country_Code": tempData.Country_Code,
	  "AP_Password": tempData.AP_Password,
	  "AP_Driver": APDriver,
	  "AP_802_11n_Enabled_Disabled": tempData.AP_802_11n_Enabled_Disabled,
	  "AP_802_11n_Channel": tempData.AP_802_11n_Channel,
	  "AP_802_11AC_Enabled_Disabled": tempData.AP_802_11AC_Enabled_Disabled,
	  "AP_802_11AC_Channel": tempData.AP_802_11AC_Channel
	}

	console.log(APData);


	
});
