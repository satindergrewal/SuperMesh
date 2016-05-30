var fs = require('fs');
var SuperMesh = require("./app_functions.js");
var lshw = require("./lshw.js");



lshw.status(function(err, status) {
	//console.log(status);


	var APFile = '/opt/SuperMeshData/hostapd_conf.data'
	var APData = ''
	var tempData = JSON.parse(fs.readFileSync(APFile, 'utf8'));
	//console.log(tempData);
	var APDriver = ''

	for (i = 0; i < status.length; i++) {
		//console.log(status[i]);
		if ( status[i].network === 'wlan0' ) {
			if ( status[i].driver === 'brcmfmac' ) {
				//console.log(status[i].driver);
				APDriver = 'nl80211'
				//console.log(APDriver);
			} else if ( status[i].driver === 'rtl8192cu' ) {
				//console.log(status[i].driver);
				APDriver = 'rtl871xdrv'
				//console.log(APDriver);
			} else {
				//console.log(status[i].driver);
				APDriver = 'nl80211'
				//console.log(APDriver);
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

	//console.log(APData);


	// Write update changes to JSON file interfaces.data
	fs.writeFile(APFile, JSON.stringify(APData, null, 2), function (err) {
		if (err) return console.log(err)
			console.log(JSON.stringify(APData, null, 2));
			console.log('writing to ' + APFile);

			//Execute promissed spanw child process
			SuperMesh.RunCmd('sudo cf-agent -K private/system_scripts/hostapd_conf.cf && sudo rm /etc/hostapd/hostapd.conf.cf-before-edit && sudo rm /etc/default/hostapd.cf-before-edit && sudo systemctl daemon-reload');

			
			lshw.status(function(err, status) {
				//console.log(status);
				for (i = 0; i < status.length; i++) {
					//console.log(status[i]);
					if ( status[i].network === 'wlan0' ) {
						if ( status[i].driver === 'brcmfmac' ) {
							//console.log(status[i].driver);
							SuperMesh.RunCmd('sudo rm -f /usr/sbin/hostapd && sudo ln -s /usr/sbin/hostapd_original /usr/sbin/hostapd && sudo systemctl restart isc-dhcp-server && sudo systemctl restart hostapd');
						} else if ( status[i].driver === 'rtl8192cu' ) {
							//console.log(status[i].driver);
							SuperMesh.RunCmd('sudo rm -f /usr/sbin/hostapd && sudo ln -s /usr/sbin/hostapd_edimax_bgn /usr/sbin/hostapd && sudo systemctl restart isc-dhcp-server && sudo systemctl restart hostapd');
						} else {
							//console.log(status[i].driver);
							SuperMesh.RunCmd('sudo rm -f /usr/sbin/hostapd && sudo ln -s /usr/sbin/hostapd_original /usr/sbin/hostapd && sudo systemctl restart isc-dhcp-server && sudo systemctl restart hostapd');
						}
					}
				}
			});
		});

	
});
