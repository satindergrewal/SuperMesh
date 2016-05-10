var fs = require('fs');
var sys = require('sys');

module.exports = {

  sayHelloInEnglish: function() {
    console.log('HELLO');
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


  var Prms = require('bluebird');
  var exec = require('child_process').exec;
  function PrmsFromChildProcess(child) {
      return new Prms(function (resolve, reject) {
          child.addListener("error", reject);
          child.addListener("exit", resolve);
      });
  }

  RestartHostapd: function(prcs,atrbs,callback) {
    var restart_hostapd = exec('sudo systemctl restart hostapd');
    PrmsFromChildProcess(restart_hostapd).then(function (result) {
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
  }

}