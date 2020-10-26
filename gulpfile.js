const gulp = require('gulp')
const openTab = require('./openTab')
const global = require('./Function/global');
const callcall = require('./controller')
const child_process = require('child_process');
const { stdout } = require('process');
const { STATUS_CODES } = require('http');
const { task } = require('gulp');
const GameNum1 = require('./Variable/variable').gameNum // 開發站
const GameNum2 = require('./Variable/variable2').gameNum // 測試站
const GameNum3 = require('./Variable/variable3').gameNum // 正式站


let userData = {
  user: '',
  site: 0,
  total: '', // 根據目標站台
  tab: 10, //頁數
  start: 0 // 開始的陣列
};


async function DevCn () {
  userData['user'] = 'ttt001',
  userData['site'] = 1,
  userData['lang'] = 1,
  userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}


async function DevEng () {
  userData['user'] = 'ttt002',
  userData['site'] = 1,
  userData['lang'] = 2,
  userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function DevVi () {
  userData['user'] = 'ttt003',
  userData['site'] = 1,
  userData['lang'] = 3,
  userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function DevTh () {
  userData['user'] = 'ttt004',
  userData['site'] = 1,
  userData['lang'] = 4,
  userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

exports.DevCn = DevCn
exports.DevEng = DevEng
exports.DevVi = DevVi
exports.DevTh = DevTh


async function TestCn () {
  userData['user'] = 'ttt001',
  userData['site'] = 2,
  userData['lang'] = 1,
  userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function TestEng () {
  userData['user'] = 'ttt002',
  userData['site'] = 2,
  userData['lang'] = 2,
  userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function TestVi () {
  userData['user'] = 'ttt003',
  userData['site'] = 2,
  userData['lang'] = 3,
  userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function TestTh () {
  userData['user'] = 'ttt004',
  userData['site'] = 2,
  userData['lang'] = 4,
  userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

exports.TestCn = TestCn
exports.TestEng = TestEng
exports.TestVi = TestVi
exports.TestTh = TestTh


async function FormalCn () {
  userData['user'] = 'ttt001',
  userData['site'] = 3,
  userData['total'] = GameNum3.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function FormalEng () {
  userData['user'] = 'ttt002',
  userData['site'] = 3,
  userData['lang'] = 2,
  userData['total'] = GameNum3.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function FormalVi () {
  userData['user'] = 'ttt003',
  userData['site'] = 3,
  userData['lang'] = 3,
  userData['total'] = GameNum3.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function FormalTh () {
  userData['user'] = 'ttt004',
  userData['site'] = 3,
  userData['lang'] = 4,
  userData['total'] = GameNum3.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

exports.FormalCn = FormalCn
exports.FormalEng = FormalEng
exports.FormalVi = FormalVi
exports.FormalTh = FormalTh


let taskName = []


// gulp 主function(控制)
async function AllGameTest() {
  // gulp allDev = 跑全部開發站
  // gulp allTest = 跑全部測試站
  // gulp allFormal = 跑全部正式站
  let siteName = 'allDev'

  switch (siteName) {
    case 'allDev':
      taskName[0] = 'DevCn'
      taskName[1] = 'DevEng',
      taskName[2] = 'DevVi',
      taskName[3] = 'DevTh'
      break;
  
    case 'allTest':
      taskName[0] = 'TestCn'
      taskName[1] = 'TestEng',
      taskName[2] = 'TestVi',
      taskName[3] = 'TestTh'
      break;
  
    case 'allFormal':
      taskName[0] = 'FormalCn'
      taskName[1] = 'FormalEng',
      taskName[2] = 'FormalVi',
      taskName[3] = 'FormalTh'
      break;
  }

  for (let i = 0; i < taskName.length; i++) {
    console.log(taskName[i])
    child_process.exec('gulp ' + taskName[i], function (err,stdout) {
      if (err) { console.log(err) }
      console.log(stdout)
    })
  } 
}


exports.AllGameTest = AllGameTest