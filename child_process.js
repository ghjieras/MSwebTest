const {
   fork
} = require('child_process')
const child_process = require('child_process');
const path = require('path')
var sleep = require('sleep');
const GameNum1 = require('./Variable/variable').gameNum // 開發站
// const GameNum2 = require('./Variable/variable2').gameNum // 測試站
const GameNum3 = require('./Variable/variable3').gameNum // 正式站
// var child = fork(path.join(__dirname, './example.js'));
let child = fork(path.join(__dirname, './controller.js'))
var userData = {
   user: 'ttt001',
   site: 1,
   lang: 6,
   // operator_id: 16,
   total: GameNum1.length, // 根據目標站台
   tab: 1, //頁數
   start: 18
};
userData['gameNum'] = process.argv[2]
// sleep.sleep(30)

child.send(userData)