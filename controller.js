const { stdout, stderr } = require('process')
const { promises } = require('fs')
const global = require('./Function/global');
const patrol = require('./example.js')
const openTab = require('./openTab')

process.on('message', async (msg, setHandle) => {
  let url = await global.getUrlFormAPI(msg.user, msg.site, 0, msg.lang);
  console.log('123')
  await callcall(msg, url, msg.site)
  return process.kill(process.pid)
  
    // patrol.headless(msg, url) // 多子程序
  })
 

  const callcall = async function(msg, url, site) { 
    if (msg.total - msg.start <= msg.tab) {
      msg.tab = msg.total - msg.start
    }
      await openTab.headless(msg, url, site).then(async() => {
        console.log(msg.start + msg.tab < msg.total)
        if ( msg.start + msg.tab < msg.total ) { // 10 + 0 < 24
          msg.start += msg.tab // 10
          msg.tab = msg.tab > msg.total ? msg.total : msg.tab // 10
          // msg.tab = msg.total - msg.start
          console.log(`tab數: ${msg.tab}`)
          return await callcall(msg, url, site)
        }
      })
  }

  module.exports = {
    callcall
  }






  // let temp = msg.tab // 10
  //     let count = temp + msg.start //10
  //     msg.total = msg.total - temp
  //     msg.start = count
  //     console.log(msg)
  //       if (msg.start + temp > msg.total && msg.total > 0) {
  //         if (msg.total <= temp) {  //
  //           msg.tab = msg.total
  //         }
  //         console.log(msg)
  //         return callcall(msg, url)
  //       } else {
  //         return true
  //       }  