const {
  fork
} = require('child_process')
const path = require('path')
const GameNum = require('../Variable/variable').gameNum
let child = fork(path.join(__dirname, './processControl.js'))

const userData = {
  userData1: {
    user: 'auto004',
    devices: 'iPhone 6',
    tab: GameNum.length
  },
  userData2: {
    user: 'auto005',
    devices: 'iPad',
    tab: GameNum.length
  }
}
child.send(JSON.stringify(userData)) //送資料給process