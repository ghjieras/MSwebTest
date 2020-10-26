const fs = require('fs');
const child_process = require('child_process');
const sleep = require('sleep')


let game = 0
for (var i = 0; i <= game; i++) {
  var workerProcess = child_process.spawn('node', ['child_process.js', i]);
//   sleep.sleep(20)
  workerProcess.stdout.on('data', function (data) {
     console.log('stdout: ' + data);
  });

  workerProcess.stderr.on('data', function (data) {
     console.log('stderr: ' + data);
  });

  workerProcess.on('close', function (code) {
     console.log('子進程已退出，退出碼 '+ code);
  });
}
