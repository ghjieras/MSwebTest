const devices = require('./devices.js')

process.on('message', async (msg) => {
  var data = JSON.parse(msg)
  // console.log(data.userData1.tab)
  for (let key in data) {
    let tab = 10 // 每次10頁
    let start = 0 // 從0開始
    let total = data[key].tab // 35頁
    await callcall(data[key], total, start, tab)
  }
  return process.kill(process.pid)
})



process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})


const callcall = async function (data, total, start, tab) {
  if (total - start <= tab) {
    tab = total - start
  }
  await devices.devicesMode(data, start, tab, total).then(async () => {
    if (start + tab < total) {
      start += tab
      tab = tab > total ? total : tab
      return await callcall(data, total, start, tab)
    }
  })
}