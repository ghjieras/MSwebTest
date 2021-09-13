const {
  stdout,
  stderr
} = require('process')
const {
  promises
} = require('fs')
const global = require('./Function/global');
const openTab = require('./openTab');

process.on('message', async (msg, setHandle) => {
  let url = await global.getUrlFormAPI(msg.user, msg.site, 0, msg.lang, msg.operator_id, 0);
  await callcall(msg, url, msg.site)
  return process.kill(process.pid)

  // patrol.headless(msg, url) // 多子程序
})


const callcall = async function (msg, url, site) {
  if (msg.total - msg.start <= msg.tab) {
    msg.tab = msg.total - msg.start
  }
  await openTab.headless(msg, url, site).then(async () => {
    if (msg.start + msg.tab < msg.total) { // 10 + 0 < 24
      msg.start += msg.tab // 10
      msg.tab = msg.tab > msg.total ? msg.total : msg.tab // 10
      return await callcall(msg, url, site)
    }
  })
}

module.exports = {
  callcall
}