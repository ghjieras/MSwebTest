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
  var device = devices[phone]
  phone = spaceOut(phone)
  let devicesPosition = position[phone]

  await (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      // slowMo: 100,
      devtools: false,
      args: [`--window-size = ${device.viewport.height}, ${device.viewport.width}`]
    })
    let pageArr = [] // 要開的tab陣列
    pageArr.push((await browser.pages())[0])

    for (let i = 1; i < tab; i++) {
      pageArr.push(await browser.newPage())
    }

    let url = await global.getUrlFormAPI(user, 1, 0, 1, 1)
    for (let i = 0; i < pageArr.length; i++) {

      // await pageArr[i].setViewport({
      //   height: device.viewport.height,
      //   width: device.viewport.width
      // })

      await pageArr[i].emulate(device);
      await pageArr[i].goto(url);
    }
    await pageArr[0].waitFor(3000)
    for (let i = 0; i < tab; i++) {
      await pageArr[i].bringToFront()
      await pageArr[i].waitFor(1000)
      await pageArr[i].click(GameNum.gameNum[start + i])
      await pageArr[i].waitForSelector('#detail')
      try {
        await pageArr[i].waitFor(15000)
        await pageArr[i].screenshot({
          path: `../photo/devices/${phone}${GameNumber}.png`
        })
      } catch (error) {
        if (error) {
          await pageArr[i].screenshot({
            path: `../photo/error/error${i}.png`
          })
        }
      }
      await pageArr[i].waitFor(1000000)
    }
    for (let i = 0; i < pageArr.length; i++) {
      var recorder = new PuppeteerScreenRecorder(pageArr[i], Config)
      await pageArr[i].bringToFront()
      let GameNumber = pageArr[i].mainFrame().url().split('/game/')[1].split('/?')[0] // 取得遊戲編號
      await pageArr[i].mouse.click(devicesPosition.spin['x'], devicesPosition.spin['y'], {
        button: "left"
      })
      await pageArr[i].waitFor(1000)
      await pageArr[i].goBack()
      await pageArr[i].waitFor(2500)
      await pageArr[i].click(GameNum.gameTypeBar[0]) //點老虎機
      await pageArr[i].waitFor(1000)
      try {
        await pageArr[i].click(GameNum.gameNum[start + i])
        await pageArr[i].waitFor(5000)
        await pageArr[i].mouse.click(devicesPosition.menu['x'], devicesPosition.menu['y'], {
          button: "left"
        })
        await pageArr[i].waitFor(1500)
        await pageArr[i].mouse.click(devicesPosition.detail['x'], devicesPosition.detail['y'], {
          button: "left"
        })
        await pageArr[i].waitFor(6500)
        const elementHandle = await pageArr[i].$('iframe#detail')
        const frame = await elementHandle.contentFrame()
        await pageArr[i].waitFor(5500)
        await frame.click('.item:nth-child(1) a')
        await pageArr[i].waitFor(1000)
        await recorder.start(`../photo/devices/${GameNumber}${phone}record.mp4`)
        await pageArr[i].waitFor(5000)
        await elementHandle.contentFrame()
        console.log(GameNumber)
        console.log(phone)
        await frame.waitForSelector('#detail:nth-child(1)')
        await pageArr[i].waitFor(1000)
        if (pageArr[i].waitForSelector('div.ps.ps--active-y', {
            visible: true
          })) {
          await pageArr[i].screenshot({
            path: `../photo/devices/de${GameNumber}${phone}.png`,
            clip: {
              x: 0,
              y: 0,
              height: 1024,
              width: 768
            }
          })
        } else {
          // BN13因為不用滾動所以沒有div.ps.ps--active-y (待解決)
          await pageArr[i].waitFor(1000)
          await pageArr[i].evaluate(async () => {
            var iframe = document.querySelector('iframe')
            var d = iframe.contentDocument
            d = d.querySelector('div.ps.ps--active-y')
            d.setAttribute('class', 'ps ps--active-y ps--scrolling-y')
            return d.scroll(0, 400)
          })
          await pageArr[i].waitFor(1000)
        }
        await recorder.stop()

        await pageArr[i].waitFor(1000)
        await frame.click('#detail div.closeBtn')
      } catch (error) {
        if (error) {
          await pageArr[i].screenshot({
            path: `../photo/error/error${i}.png`
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