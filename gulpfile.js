const gulp = require('gulp')
const openTab = require('./openTab')
const global = require('./Function/global');
const callcall = require('./controller')
const child_process = require('child_process');
const watcher = gulp.watch(['input/*.js'])


const {
  stdout
} = require('process');
const {
  STATUS_CODES
} = require('http');
const {
  task
} = require('gulp');
const GameNum1 = require('./Variable/variable').gameNum // 開發站
const GameNum2 = require('./Variable/variable2').gameNum // 測試站
const GameNum3 = require('./Variable/variable3').gameNum; // 正式站
const {
  rejects
} = require('assert');
const {
  copyFileSync
} = require('fs');


let userData = {
  user: '',
  site: 0,
  operator_id: 22,
  total: '', // 根據目標站台
  tab: 5, //頁數
  start: 0 // 開始的陣列
};

async function UATidrk001() {
  userData['user'] = 'idrkAuto001',
    userData['site'] = 3,
    userData['lang'] = 1,
    userData['operator_id'] = 212,
    userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang, userData.operator_id, 0);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}


async function UATidrk002() {
  userData['user'] = 'idrkAuto002',
    userData['site'] = 3,
    userData['lang'] = 2,
    userData['operator_id'] = 212,
    userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang, userData.operator_id, 0);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}


async function UATidrk003() {
  userData['user'] = 'idrkAuto003',
    userData['site'] = 3,
    userData['lang'] = 3,
    userData['operator_id'] = 212,
    userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang, userData.operator_id, 0);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function UATidrk004() {
  userData['user'] = 'idrkAuto004',
    userData['site'] = 3,
    userData['lang'] = 4,
    userData['operator_id'] = 212,
    userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang, userData.operator_id, 0);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function UATidrk005() {
  userData['user'] = 'idrkAuto005',
    userData['site'] = 3,
    userData['lang'] = 5,
    userData['operator_id'] = 212,
    userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang, userData.operator_id, 0);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function UATidrk006() {
  userData['user'] = 'idrkAuto006',
    userData['site'] = 3,
    userData['lang'] = 6,
    userData['operator_id'] = 212,
    userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang, userData.operator_id, 0);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}



exports.UATidrk001 = UATidrk001
exports.UATidrk002 = UATidrk002
exports.UATidrk003 = UATidrk003
exports.UATidrk004 = UATidrk004
exports.UATidrk005 = UATidrk005
exports.UATidrk006 = UATidrk006


async function DevCn() {
  userData['user'] = 'auto001',
    userData['site'] = 1,
    userData['lang'] = 1,
    userData['operator_id'] = 16,
    userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang, userData.operator_id, 0);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function DevEng() {
  userData['user'] = 'auto002',
    userData['site'] = 1,
    userData['lang'] = 2,
    userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang, userData.operator_id, 0);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function DevVi() {
  userData['user'] = 'auto003',
    userData['site'] = 1,
    userData['lang'] = 3,
    userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang, userData.operator_id);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function DevTh() {
  userData['user'] = 'auto004',
    userData['site'] = 1,
    userData['lang'] = 4,
    userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang, userData.operator_id);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function DevKo() {
  userData['user'] = 'auto005',
    userData['site'] = 1,
    userData['lang'] = 5,
    userData['total'] = GameNum1.length // 開發站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function DevId() {
  userData['user'] = 'auto006',
    userData['site'] = 1,
    userData['lang'] = 6,
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
exports.DevKo = DevKo
exports.DevId = DevId

async function TestCn() {
  userData['user'] = 'ttt001',
    userData['site'] = 2,
    userData['lang'] = 1,
    userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function TestEng() {
  userData['user'] = 'ttt002',
    userData['site'] = 2,
    userData['lang'] = 2,
    userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function TestVi() {
  userData['user'] = 'ttt003',
    userData['site'] = 2,
    userData['lang'] = 3,
    userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function TestTh() {
  userData['user'] = 'ttt004',
    userData['site'] = 2,
    userData['lang'] = 4,
    userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  console.log('tabLength: ' + userData['total'].length)
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function TestKo() {
  userData['user'] = 'ttt005',
    userData['site'] = 2,
    userData['lang'] = 5,
    userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  console.log('tabLength: ' + userData['total'].length)
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function TestId() {
  userData['user'] = 'ttt006',
    userData['site'] = 2,
    userData['lang'] = 6,
    userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  console.log('tabLength: ' + userData['total'].length)
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

exports.TestCn = TestCn
exports.TestEng = TestEng
exports.TestVi = TestVi
exports.TestTh = TestTh
exports.TestKo = TestKo
exports.TestId = TestId


async function FormalCn() {
  userData['user'] = 'auto001',
    userData['site'] = 3,
    userData['lang'] = 1,
    userData['total'] = GameNum3.length // 正式站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function FormalEng() {
  userData['user'] = 'auto002',
    userData['site'] = 3,
    userData['lang'] = 2,
    userData['total'] = GameNum3.length // 正式站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function FormalVi() {
  userData['user'] = 'auto003',
    userData['site'] = 3,
    userData['lang'] = 3,
    userData['total'] = GameNum3.length // 正式站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function FormalTh() {
  userData['user'] = 'auto004',
    userData['site'] = 3,
    userData['lang'] = 4,
    userData['total'] = GameNum3.length // 正式站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function FormalKo() {
  userData['user'] = 'auto005',
    userData['site'] = 3,
    userData['lang'] = 5,
    userData['total'] = GameNum3.length // 正式站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function FormalId() {
  userData['user'] = 'ttt005',
    userData['site'] = 3,
    userData['lang'] = 6,
    userData['total'] = GameNum3.length // 正式站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}


exports.FormalCn = FormalCn
exports.FormalEng = FormalEng
exports.FormalVi = FormalVi
exports.FormalTh = FormalTh
exports.FormalKo = FormalKo
exports.FormalId = FormalId





async function OtherCn() {
  userData['user'] = 'other001',
    userData['site'] = 2,
    userData['lang'] = 1,
    userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  console.log('url:' + url)
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function OtherEng() {
  userData['user'] = 'other002',
    userData['site'] = 2,
    userData['lang'] = 2,
    userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}


async function OtherVi() {
  userData['user'] = 'other003',
    userData['site'] = 2,
    userData['lang'] = 3,
    userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}


async function OtherTh() {
  userData['user'] = 'other004',
    userData['site'] = 2,
    userData['lang'] = 4,
    userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function OtherKo() {
  userData['user'] = 'other005',
    userData['site'] = 2,
    userData['lang'] = 5,
    userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}

async function OtherId() {
  userData['user'] = 'other006',
    userData['site'] = 2,
    userData['lang'] = 6,
    userData['total'] = GameNum2.length // 測試站DOM
  var url = await global.getUrlFormAPI(userData.user, userData.site, 0, userData.lang);
  await callcall.callcall(userData, url, userData.site).then(() => {
    return true
  })
}


exports.OtherCn = OtherCn
exports.OtherEng = OtherEng
exports.OtherVi = OtherVi
exports.OtherTh = OtherTh
exports.OtherKo = OtherKo
exports.OtherId = OtherId


let taskName = []

async function allTest() {


  // taskName[0] = 'UATidrk001',
  //   taskName[1] = 'UATidrk002',
  //   taskName[2] = 'UATidrk003',
  //   taskName[3] = 'UATidrk004',
  //   taskName[4] = 'UATidrk005',
  //   taskName[5] = 'UATidrk006'



  // taskName[0] = 'DevCn'
  // taskName[1] = 'DevEng',
  // taskName[2] = 'DevVi',
  // taskName[3] = 'DevTh',
  // taskName[4] = 'DevKo',
  // taskName[5] = 'DevId'

  // taskName[0] = 'TestCn',
  //   taskName[1] = 'TestEng',
  //   taskName[2] = 'TestVi',
  //   taskName[3] = 'TestTh',
  //   taskName[4] = 'TestKo',
  //   taskName[5] = 'TestId'


  taskName[0] = 'FormalCn',
    taskName[1] = 'FormalEng',
    taskName[2] = 'FormalVi',
    taskName[3] = 'FormalTh',
    taskName[4] = 'FormalKo',
    taskName[5] = 'FormalId'


  // taskName[0] = 'OtherCn',
  //   taskName[1] = 'OtherEng',
  //   taskName[2] = 'OtherVi',
  //   taskName[3] = 'OtherTh',
  //   taskName[4] = 'OtherKo',
  //   taskName[5] = 'OtherId'


  for (let i = 0; i < taskName.length; i++) {
    console.log('taskName.length: ' + taskName.length)
    console.log('gulp ' + taskName[i])
    child_process.exec('gulp ' + taskName[i], (error) => {
      console.log(error)
    })
  }
  thisTime = `${new Date().getHours()} : ${new Date().getMinutes()}`
}


// watcher.on('change', allTest)
exports.allTest = allTest