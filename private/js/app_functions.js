var fs = require('fs');
var sys = require('sys');

module.exports = {
  
  sayHelloInEnglish: function() {
    console.log('HELLO');
  },

  PwdCwd: function() {
    console.log('Current directory: ' + __dirname);
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

  RunCmd: function(getCmd) {
    var Promise = require('bluebird');
    var exec = require('child_process').exec;
    function promiseFromChildProcess(child) {
        return new Promise(function (resolve, reject) {
            child.addListener("error", reject);
            child.addListener("exit", resolve);
        });
    }

    var restart_hostapd = exec(getCmd);
    promiseFromChildProcess(restart_hostapd).then(function (result) {
        console.log('promise complete: ' + result);
        console.log('=> Command Executed Successfully')
    }, function (err) {
        console.log('=> Error executing command.')
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
  }

}