const {fork} = require('child_process')
const child_process = require('child_process');
const path = require('path')
var sleep = require('sleep');
const GameNum1 = require('./Variable/variable').gameNum // 開發站
const GameNum2 = require('./Variable/variable2').gameNum // 測試站
const GameNum3 = require('./Variable/variable3').gameNum // 正式站
// var child = fork(path.join(__dirname, './example.js'));
let child = fork(path.join(__dirname, './controller.js'))
var userData = {
   user: 'ttt004',
   site: 1,
   lang: 1,
   total: GameNum3.length, // 根據目標站台
   tab: 10, //頁數
   start: 0
};
userData['gameNum'] = process.argv[2]
// sleep.sleep(30)
console.log(child.pid)

child.send(userData)


