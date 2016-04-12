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
  }


}