var fs = require('fs');
var sys = require('sys');

module.exports = {
  
  sayHelloInEnglish: function() {
    console.log('HELLO');
  },

  PwdCwd: function() {
    console.log('Current directory: ' + ${process.cwd()});
  },

  //Start Process by passing executable and its attribute.
  ExecuteProcess: function(prcs,atrbs,callback) {
    var spawn = require('child_process').spawn,
    ExecShellCmd = spawn(prcs, [atrbs]);
    var result = '';
    ExecShellCmd.stdout.on('data', function (data) {
      //console.log('Stdout: ' + data);
      result += data.toString();
    });

    ExecShellCmd.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });
    
    ExecShellCmd.on('close', function (code) {
      //console.log('child process exited with code ' + code);
      callback(result);
    });
  },


  RestartHostapd: function() {
    var Promise = require('bluebird');
    var exec = require('child_process').exec;
    function promiseFromChildProcess(child) {
        return new Promise(function (resolve, reject) {
            child.addListener("error", reject);
            child.addListener("exit", resolve);
        });
    }

    var restart_hostapd = exec('sudo systemctl restart hostapd');
    promiseFromChildProcess(restart_hostapd).then(function (result) {
        console.log('promise complete: ' + result);
        console.log('=> Hostapd service restarted')
    }, function (err) {
        console.log('=> Error restarting Hostapd Service.')
        console.log('promise rejected: ' + err);
        
    });
    restart_hostapd.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
        
    });
    restart_hostapd.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        
    });
    restart_hostapd.on('close', function (code) {
        console.log('closing code: ' + code);
    });
  },

RestartNetwork: function() {
    var Promise = require('bluebird');
    var exec = require('child_process').exec;
    function promiseFromChildProcess(child) {
        return new Promise(function (resolve, reject) {
            child.addListener("error", reject);
            child.addListener("exit", resolve);
        });
    }

    var restart_network = exec('sudo systemctl restart network');
    promiseFromChildProcess(restart_network).then(function (result) {
        console.log('promise complete: ' + result);
        console.log('=> Hostapd service restarted')
    }, function (err) {
        console.log('=> Error restarting Hostapd Service.')
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
  },

 SystemctlDaemonReload: function() {
    var Promise = require('bluebird');
    var exec = require('child_process').exec;
    function promiseFromChildProcess(child) {
        return new Promise(function (resolve, reject) {
            child.addListener("error", reject);
            child.addListener("exit", resolve);
        });
    }

    var systemctl_reload_daemon = exec('sudo systemctl daemon-reload');
    promiseFromChildProcess(systemctl_reload_daemon).then(function (result) {
        console.log('promise complete: ' + result);
        console.log('=> Systemctl Service Daemon Reloaded')
    }, function (err) {
        console.log('=> Error Reloading Systemctl Daemon Reloaded.')
        console.log('promise rejected: ' + err);
        
    });
    systemctl_reload_daemon.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
        
    });
    systemctl_reload_daemon.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        
    });
    systemctl_reload_daemon.on('close', function (code) {
        console.log('closing code: ' + code);
    });
  }

}