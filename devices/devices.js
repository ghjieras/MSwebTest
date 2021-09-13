const puppeteer = require('puppeteer');
const {
  PuppeteerScreenRecorder
} = require('puppeteer-screen-recorder')
const devices = require('puppeteer/DevicesDescriptors').devicesMap
const global = require('../Function/global')
const GameNum = require('../Variable/variable')
const position = require('./devicesPosition')


const Config = {
  followNewTab: true,
  fps: 60,
  ffmpeg_Path: null
}


async function devicesMode(data, start, tab, total) {
  console.log(data)
  console.log("start: " + start)
  console.log("tab: " + tab)
  console.log("total: " + total)
  var phone = data.devices
  var user = data.user
  var device = puppeteer.devices[phone]
  phone = spaceOut(phone) // 去空白
  console.log('phone', phone)
  let devicesPosition = position[phone]
  console.log('devicesPosition: ,' + devicesPosition)

  await (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      // slowMo: 100,
      // devtools: false,
      // args: [`--window-size=${device.viewport.width},${device.viewport.height}`],
      defaultViewport: null,
      // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/Chrome' // 使用chrome瀏覽器
    })
    let pageArr = [] // 要開的tab陣列
    pageArr.push((await browser.pages())[0])

    for (let i = 1; i < tab; i++) {
      pageArr.push(await browser.newPage())
    }

    let url = await global.getUrlFormAPI(user, 1, 0, 1, 1)
    for (let i = 0; i < pageArr.length; i++) {
      await pageArr[i].emulate(device);
      await pageArr[i].goto(url);
      console.log('devices emulate')
    }
    await pageArr[0].waitFor(2000)
    for (let i = 0; i < tab; i++) {
      await pageArr[i].bringToFront()
      await pageArr[i].waitFor(3000)
      try {
        await pageArr[i].click(GameNum.gameNum[start + i])
        await pageArr[i].waitForSelector('#detail')
        await pageArr[i].waitFor(19500)
        let GameNumber = pageArr[i].mainFrame().url().split('/game/')[1].split('/?')[0] // 取得遊戲編號
        await pageArr[i].waitFor(2000)
        // await pageArr[i].screenshot({
        //   path: `../testPupp/photo/devices/${phone}${GameNumber}.png`
        // })
      } catch (error) {
        if (error) {
          console.log(error)
          await pageArr[i].screenshot({
            path: `../testPupp/photo/error/error${i}.png`
          })
        }
      }
      await pageArr[i].waitFor(2000)
    }
    for (let i = 0; i < pageArr.length; i++) {
      var recorder = new PuppeteerScreenRecorder(pageArr[i], Config)
      await pageArr[i].bringToFront()
      let GameNumber = pageArr[i].mainFrame().url().split('/game/')[1].split('/?')[0] // 取得遊戲編號
      console.log("GameNumber: " + GameNumber, typeof (GameNumber))
      if (GameNumber === "BN15" || GameNumber === "BN17") {
        console.log('+75: ', devicesPosition.spin['y'] + 75)
        await pageArr[i].mouse.click(devicesPosition.spin['x'], devicesPosition.spin['y'] + 75, {
          button: "left"
        })
      } else {
        console.log('沒+75: ', devicesPosition.spin['x'])
        await pageArr[i].mouse.click(devicesPosition.spin['x'], devicesPosition.spin['y'], {
          button: "left"
        })
      }
      // await pageArr[i].screenshot({
      //   path: `../testPupp/photo/devices/spin${phone}${GameNumber}.png`
      // })
      await pageArr[i].waitFor(1000)
      await pageArr[i].goBack()
      await pageArr[i].waitFor(2500)
      await pageArr[i].click(GameNum.gameTypeBar[0]) //點老虎機
      await pageArr[i].waitFor(1500)
      try {
        await pageArr[i].click(GameNum.gameNum[start + i])
        await pageArr[i].waitFor(7000)
        await pageArr[i].mouse.click(devicesPosition.menu['x'], devicesPosition.menu['y'], {
          button: "left"
        })
        console.log('clicked')
        // await pageArr[i].waitFor(100)
        await pageArr[i].waitFor(1500)
        // await pageArr[i].screenshot({
        //   path: `../testPupp/photo/devices/menuopen${i}.png`
        // })
        await pageArr[i].mouse.click(devicesPosition.detail['x'], devicesPosition.detail['y'], {
          button: "left"
        })
        await pageArr[i].waitForSelector('iframe')
        await pageArr[i].waitFor(5000)
        const elementHandle = await pageArr[i].$('iframe#detail')
        var frame = await elementHandle.contentFrame()
        await pageArr[i].waitFor(5000)
        await frame.click('.item:nth-child(1) a') // 點第一筆單
        await pageArr[i].waitFor(6000)
        frame = await elementHandle.contentFrame()
        await recorder.start(`../testPupp/photo/devices/${GameNumber}${phone}record.mp4`)
        // if (pageArr[i].waitForSelector('div.ps.ps--active-y', {
        //     visible: true
        //   })) {
        await pageArr[i].waitFor(5000)
        await pageArr[i].click('#detail')
        await pageArr[i].waitFor(2000)
        await pageArr[i].evaluate(() => {
          var iframe = document.querySelector('iframe')
          var d = iframe.contentDocument.querySelector('div.ps.ps--active-y')
          d.setAttribute('class', 'ps ps--active-y ps--scrolling-y')
          d.scroll(0, 700)
          return true
        }).then((sum) => {
          setTimeout(() => {
            console.log(sum)
          }, 2000)
        })
        // }
        await pageArr[i].waitFor(4000)
        await recorder.stop()
        console.log('detail down')
        await pageArr[i].waitFor(2000)
        await frame.click('#detail div.closeBtn')
      } catch (error) {
        if (error) {
          await pageArr[i].screenshot({
            path: `../testPupp/photo/error/error${GameNumber}${i}.png`
          })
        }
        console.log(error)
      }
      // await pageArr[i].close()
    }
    await browser.close()
  })()
  return true
}


module.exports = {
  devicesMode
}



function spaceOut(str) {
  return str.split(' ').join('')
}