var express = require('express');
var fs = require('fs');
var router = express.Router();

var sys = require('sys')
var exec = require('child_process').exec;


// SuperMesh app functions
var SuperMesh = require("../private/js/app_functions.js");

/* GET network settings. */
router.get('/', function(req, res, next) {
  res.render('network', {title: 'Controle Centre Admin'});
});

router.get('/getip', function(req, res, next) {

	var ifoutput;
	fs.readFile('private/system_scripts/interfaces.data', 'utf8', function (err, data) {
	  if (err) throw err;
	  ifoutput = JSON.parse(data);
	  res.send(ifoutput);
	});

	//var ifoutput = SuperMesh.ExecuteProcess('private/system_scripts/read_wlan0.sh','', function(Output) {
		//console.log(Output);
		//res.send(Output);
	//});

	//console.log(SuperMesh.ExecuteProcess('echo','Hello'));
	//console.log('IfOutput: ' + ifoutput);
	//res.send('<h1>Ready to get IP Addresses.</h1><pre>' + ifoutput + '</pre>');
});


router.get('/ifconfig', function(req, res, next) {

	var ifconfig = require('wireless-tools/ifconfig');
 
	ifconfig.status(function(err, status) {
		res.send(status);
	});

});

router.get('/ifconfig/wlan1', function(req, res, next) {
	var wlan1status = require('wireless-tools/ifconfig');
 
	wlan1status.status('wlan1',function(err, status) {
		var ifconfig_demo_data = '{"interface":"wlan1","link":"ethernet","address":"00:0b:82:15:96:70","ipv4_address":"192.168.10.2","ipv4_broadcast":"192.168.10.255","ipv4_subnet_mask":"255.255.255.0","up":true,"broadcast":true,"multicast":true}';
		//res.send(status);
		res.send(ifconfig_demo_data);
	});
});

/* POST to Update Network Settings. */
router.post('/update', function(req, res) {
	var interfacesFile = 'private/system_scripts/interfaces.data'
	var interfacesData = ''

	/*fs.readFile(interfacesFile, 'utf8', (err, data) => {
	  if (err) throw err;
	  console.log(JSON.stringify(data));
	});*/	

	//console.log('======= req.body =======');
	//console.log(req.body);
	//console.log('====== req.body.eth0_enable_disable ======');
	//console.log(req.body.eth0_iface);

	//req.body.eth0_enable_disable = ''
	//req.body.eth1_enable_disable = ''
	//req.body.wlan0_enable_disable = ''
	//req.body.wlan1_enable_disable = ''


	interfacesData = {

	

	'eth0_enable_disable' : (req.body.eth0_enable_disable === "false") ? "# " : "",
	'eth0_iface' : req.body.eth0_iface,
	'eth0_enable_disable_dhcp' : (req.body.eth0_iface === "dhcp" || req.body.eth0_enable_disable === "false") ? "# " : "",
	'eth0_addr' : req.body.eth0_addr,
	'eth0_netmask' : req.body.eth0_netmask,
	'eth0_gateway' : req.body.eth0_gateway,


	'eth1_enable_disable' : (req.body.eth1_enable_disable === "false") ? "# " : "",
	'eth1_iface' : req.body.eth1_iface,
	'eth1_enable_disable_dhcp' : (req.body.eth1_iface === "dhcp" || req.body.eth1_enable_disable === "false") ? "# " : "",
	'eth1_addr' : req.body.eth1_addr,
	'eth1_netmask' : req.body.eth1_netmask,
	'eth1_gateway' : req.body.eth1_gateway,
	'eth1_gate_metric' : req.body.eth1_gate_metric,
	'eth1_gate_metric': '1000',
	
	'wlan1_enable_disable' : (req.body.wlan1_enable_disable === "false") ? "# " : "",
	'wlan1_iface' : req.body.wlan1_iface,
	'wlan1_enable_disable_dhcp' : (req.body.wlan1_iface === "dhcp" || req.body.wlan1_enable_disable === "false") ? "# " : "",
	'wlan1_addr' : req.body.wlan1_addr,
	'wlan1_netmask' : req.body.wlan1_netmask,
	'wlan1_gateway' : req.body.wlan1_gateway,
	
	'wlan0_enable_disable' : (req.body.wlan0_enable_disable === "false") ? "# " : "",
	'wlan0_iface' : req.body.wlan0_iface,
	'wlan0_enable_disable_dhcp' : (req.body.wlan0_iface === "dhcp" || req.body.wlan0_enable_disable === "false") ? "# " : "",
	'wlan0_addr' : req.body.wlan0_addr,
	'wlan0_netmask' : req.body.wlan0_netmask,
	'wlan0_gateway' : req.body.wlan0_gateway,
	'wlan0_gate_metric' : req.body.wlan0_gate_metric,
	'wlan0_gate_metric': '1000',

	}



	//console.log('=========== JSON Stringify ===========');
	//console.log(JSON.stringify(interfacesData, null, 2))

	// Write update changes to JSON file interfaces.data
	fs.writeFile(interfacesFile, JSON.stringify(interfacesData, null, 2), function (err) {
		if (err) return console.log(err)
			//console.log(JSON.stringify(interfacesData, null, 2))
			//console.log('writing to ' + interfacesFile)
			//res.send((err === null) ? { msg: '' } : { msg: err });


			//Execute promissed spanw child process
			var Promise = require('bluebird');
			var exec = require('child_process').exec;

			function promiseFromChildProcess(child) {
			    return new Promise(function (resolve, reject) {
			        child.addListener("error", reject);
			        child.addListener("exit", resolve);
			    });
			}

			var edit_network = exec('sudo cf-agent -K private/system_scripts/edit_network_config.cf');

			promiseFromChildProcess(edit_network).then(function (result) {
			    console.log('promise complete: ' + result);
			    console.log('=> Network file edited')
			    //res.send('{"msg": "success","result": result}');
			}, function (err) {
			    console.log('promise rejected: ' + err);
			    //res.send(err);
			});

			edit_network.stdout.on('data', function (data) {
			    console.log('stdout: ' + data);
			    
			});
			edit_network.stderr.on('data', function (data) {
			    console.log('stderr: ' + data);
			    
			});
			edit_network.on('close', function (code) {
			    console.log('closing code: ' + code);
			    
			});


			var restart_network = exec('sudo systemctl restart networking');

			promiseFromChildProcess(restart_network).then(function (result) {
			    console.log('promise complete: ' + result);
			    console.log('=> Network service restarted')
			    
			}, function (err) {
			    console.log('=> Error restarting Network Service.')
			    console.log('promise rejected: ' + err);
			    
			});

			restart_network.stdout.on('data', function (data) {
			    console.log('stdout: ' + data);
			    
			});
			restart_network.stderr.on('data', function (data) {
			    console.log('stderr: ' + data);
			    
			});
			restart_network.on('close', function (code) {
			    console.log('closing code: ' + code);
			    
			});

			//Execute cfengine script to make changes to network settings and restart network service.
			//function puts(error, stdout, stderr) { sys.puts(stdout) }
			//exec("sudo cf-agent -K private/system_scripts/edit_network_config.cf", puts);
			
			//var ifoutput = SuperMesh.ExecuteProcess('sudo /var/cfengine/bin/cf-agent -K','private/system_scripts/edit_network_config.cf', function(Output) {
			//console.log(Output);
			//res.send(Output);
			//});
		});
	res.end('{"msg": "success","result": "result"}');
});

module.exports = router;
