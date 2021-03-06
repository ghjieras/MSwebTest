const puppeteer = require('puppeteer');
const global = require('./Function/global');
const devices = require('puppeteer/DevicesDescriptors').devicesMap
const iPhone = puppeteer.devices['iPhone 6']
const Lobby = require('./Element/element').Lobby
const fs = require('fs')

async function headless(userData, url, site) {
  site === 1 ? site = '' : site = ''
  var GameNum = require('./Variable/variable' + site).gameNum
  var GameTypeBar = require('./Variable/variable').gameTypeBar
  let errorResult = []
  await (async () => {
    console.log(`${new Date().getHours()} : ${new Date().getMinutes()}`)
    // console.log(userData.start)
    const browser = await puppeteer.launch({
      args: [
        // '--disable-dev-shm-usage'
        `--window-size=800,600`
      ],
      defaultViewport: null,
      ignoreHTTPSErrors: true,
      ignoreDefaultArgs: ['--disable-extensions'],
      headless: false,
      // headless: true
      // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/Chrome' // 使用chrome瀏覽器
    });
    let pageArr = [] // 要開的tab陣列
    pageArr.push((await browser.pages())[0])
    for (let i = 1; i < userData.tab; i++) {
      pageArr.push(await browser.newPage())
    }
    for (let i = 0; i < pageArr.length; i++) {
      await pageArr[i].goto(url)
      await pageArr[i].waitFor(1000)
    }
    // await pageArr[0].goto('https://assets.msslot.bet/game/BN05/?language=ko&token=da21949d23d94eae88655a90e5ef9c45&s=Z3N2cjEubXNzbG90LmJldCxkYXRhMS5tc3Nsb3QuYmV0')
    await pageArr[0].waitFor(10000)
    for (let i = 0; i < pageArr.length; i++) {
      await pageArr[i].bringToFront()
      await pageArr[i].waitFor(5000)

      /** 老虎機 */
      await pageArr[i].click(GameTypeBar[0]) // 點"老虎機"
      // await pageArr[i].setViewport({
      //   width: 1024,
      //   height: 768
      // })
      // await pageArr[i].emulate(iPhone)
      await pageArr[i].waitFor(1000)
      await pageArr[i].click(GameNum[(Number(userData.start) + Number(i))]) // 點選遊戲
      console.log(GameNum[(Number(userData.start) + Number(i))])
      await pageArr[i].waitFor(1000)
      // console.log('pageArr[i]: ', pageArr[i].mainFrame().url().split('/game/')[1])
      let gameNum = pageArr[i].mainFrame().url().split('/game/')[1]
      let GameNumber = pageArr[i].mainFrame().url().split('/game/')[1].split('/?')[0] // 取得遊戲編號
      console.log('GAMENUM: ', gameNum)
      console.log('GAMENUMBER: ', GameNumber)
      try {
        await pageArr[i].waitForSelector('#game canvas', {
          timeout: 20000
        })
        await pageArr[i].waitFor(10000)
      } catch (error) {
        if (error) {
          await fs.mkdir('./遊戲連結錯誤', async function () {
            errorResult.push(GameNumber + ' : ' + error + '\n')
            await fs.writeFile('./遊戲連結錯誤/404.txt', errorResult, function (err) {
              console.log('已寫入 遊戲連結.txt')
            })
          })
        }
      }
    }
    errorResult.length = 0
    if (userData.tab < 5) { // 跑的數量<5的時候
      await pageArr[0].waitFor(23000)
    } else {
      await pageArr[0].waitFor(20000)
    }

    for (let i = 0; i < pageArr.length; i++) {
      await pageArr[i].bringToFront()
      await pageArr[i].waitFor(2000)
      GameNumber = pageArr[i].mainFrame().url().split('/game/')[1].split('/?')[0]
      console.log(GameNumber)
      let GameLang = pageArr[i].mainFrame().url().split('/?language=')[1].split('&token')[0]
      await pageArr[i].screenshot({
        path: `./photo/normal${GameNumber}${GameLang}.png`
      })
      await pageArr[i].waitFor(1000)
      await pageArr[i].mouse.click(750, 307, {
        button: "left"
      }) // auto
      await pageArr[i].waitFor(1000)
      await pageArr[i].screenshot({
        path: `./photo/auto${GameNumber}${GameLang}.png`
      })
      await pageArr[i].waitFor(800)
      await pageArr[i].mouse.click(756, 188, {
        button: "left"
      }) // 選籌碼
      await pageArr[i].waitFor(800)
      await pageArr[i].mouse.click(756, 350, {
        button: "left"
      }) // 選擇右上角乘數
      await pageArr[i].waitFor(1000)
      await pageArr[i].screenshot({
        path: `./photo/select${GameNumber}${GameLang}.png`
      })
      await pageArr[i].waitFor(1000)
      await pageArr[i].mouse.click(570, 165, {
        button: "left"
      })
      // //選籌碼
      // await pageArr[i].waitFor(800)
      // await pageArr[i].mouse.click(250, 230, {
      //   button: "left"
      // }) // 選0.25
      // await pageArr[i].waitFor(1000)
      // await pageArr[i].screenshot({
      //   path: `./photo/selectPoint${GameNumber}${GameLang}.png`
      // })
      await pageArr[i].waitFor(500)
      await pageArr[i].mouse.click(756, 212, {
        button: "left"
      }) // SPIN
      await pageArr[i].waitFor(1000)
      await pageArr[i].mouse.click(756, 212, {
        button: "left"
      }) // SPIN
      await pageArr[i].waitFor(1000)
      await pageArr[i].screenshot({
        path: `./photo/spin${GameNumber}${GameLang}.png`
      })
      await pageArr[i].waitFor(1500)
      await pageArr[i].goBack(); // 離開
      await pageArr[i].waitFor(2000)
      //關閉重取url
      try {
        await pageArr[i].click('#app > div.main div.swiper-slide.swiper-slide-next')
        await pageArr[i].waitFor(1000)
        await pageArr[i].click(GameNum[(Number(userData.start) + Number(i))])
        await pageArr[i].waitForSelector('#game canvas', {
          timeout: 50000
        })
        await pageArr[i].waitFor(4000)
        await pageArr[i].mouse.click(35, 417, {
          button: "left"
        }) // menu
        await pageArr[i].waitFor(1000)
        await pageArr[i].mouse.click(35, 235, {
          button: "left"
        }) // 幣別切換鈕
        await pageArr[i].screenshot({
          path: `./photo/point${GameNumber}${GameLang}.png`
        })
        await pageArr[i].waitFor(1000)
        await pageArr[i].screenshot({
          path: `./photo/point${GameNumber}${GameLang}.png`
        })
        await pageArr[i].waitFor(1000)
        // await pageArr[i].mouse.click(43, 285, { button: "left" })  // 幣別切換鈕
        // await pageArr[i].waitFor(500)
        await pageArr[i].mouse.click(35, 175, {
          button: "left"
        }) // 細單(開發站)
        await pageArr[i].waitForSelector('iframe')
        await pageArr[i].waitFor(5000)
        const elementHandle = await pageArr[i].$('body iframe')
        const frame = await elementHandle.contentFrame()
        await frame.waitForSelector('.result-content')
        await pageArr[i].screenshot({
          path: `./photo/PC${GameNumber}${GameLang}.png`
        })
        await pageArr[i].waitFor(500)
        await pageArr[i].evaluate(() => {
          window.scroll(0, 10000)
          return true
        })
        await pageArr[i].screenshot({
          path: `./photo/Phone${GameNumber}${GameLang}.png`
        })

        await pageArr[i].waitFor(7000) // 等待細單總表載入
        await frame.click('#result > div.result-content > div.dataList > div > ol > li')
        await pageArr[i].waitFor(5000)
        GameNumber = pageArr[i].mainFrame().url().split('/game/')[1].split('/?')[0]
        GameLang = pageArr[i].mainFrame().url().split('/?language=')[1].split('&token')[0]
        await pageArr[i].waitFor(7000)


        await pageArr[i].screenshot({
          path: `./photo/PCcontent${GameNumber}${GameLang}.png`
        })
        await pageArr[i].waitFor(500)
        // await pageArr[i].screenshot({
        //   path: `./photo/Phonecontent${GameNumber}${GameLang}.png`
        // })

        await pageArr[i].waitFor(500)
        await frame.click('#result #detail div.closeBtn:nth-child(1)') // 關閉細單內容
        await pageArr[i].waitFor(2000)
        await frame.click('div.closeBtn')
        await pageArr[i].waitFor(1000)
        // await pageArr[i].mouse.click(52, 580, { button: "left" }) // 關閉細單
        // await pageArr[i].waitFor(1000)
        await pageArr[i].mouse.click(35, 258, {
          button: "left"
        }) // 離開按鈕
        await pageArr[i].waitFor(2500)
        await pageArr[i].screenshot({
          path: `./photo/leave${GameNumber}${GameLang}.png`
        })
        await pageArr[i].waitFor(2000)

        await console.log(`${new Date().getHours()} : ${new Date().getMinutes()}`)
      } catch (error) {
        if (error) {
          await fs.mkdir('./遊戲連結錯誤', async function () {
            errorResult.push(GameNumber + ' : ' + error + '\n')
            await fs.writeFile('./遊戲連結錯誤/細單錯誤.txt', errorResult, function (err) {
              console.log('已寫入 遊戲連結.txt')
            })
          })
        }
      }
      /** 捕魚機 */
      // await pageArr[i].click(GameTypeBar[1]) // 點"捕魚機"
      // await pageArr[i].waitFor(3000)
      // await pageArr[i].click(GameNum[(Number(userData.start) + Number(i))])  // 點選遊戲
      // await pageArr[i].waitForSelector('#game', { timeout: 20000 })
      // await pageArr[i].screenshot({ path: `./photo/fishGame.png` })
      // await browser.close()
    }
    await browser.close()
  })()
  return true
}
module.exports = {
  headless
}