const puppeteer = require('puppeteer');
const global = require('./Function/global');
const { resolve } = require('path');
const { count } = require('console');
const Lobby = require('./Element/element').Lobby
const fs = require('fs')

async function headless(userData, url, site) {
  site === 1 ? site = '' : site = ''
  var GameNum = require('./Variable/variable' + site).gameNum
  let errorResult = []
  await (async () => {
    console.log(`${new Date().getHours()} : ${new Date().getMinutes()}`)
    // console.log(userData.start)
    const browser = await puppeteer.launch({
      args: [
        '--disable-dev-shm-usage'
      ],
      ignoreDefaultArgs: ['--disable-extensions'],
      headless: false,
      // headless: true
      executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/Chrome' // 使用chrome瀏覽器
    });
    let pageArr = [] // 要開的tab陣列
    pageArr.push((await browser.pages())[0])
    for (let i = 1; i < userData.tab; i++) {
      await pageArr.push(await browser.newPage())
    }
    for (let i = 0; i < pageArr.length; i++) {
      await pageArr[i].goto(url)
    }
    await pageArr[0].waitFor(10000)
    for (let i = 0; i < pageArr.length; i++) {
      await pageArr[i].bringToFront()
      await pageArr[i].waitFor(5000)
      await pageArr[i].click(GameNum[(Number(userData.start) + Number(i))])  // 點選遊戲
      await pageArr[i].waitFor(15000)
      console.log('pageArr[i]: ', pageArr[i].mainFrame().url().split('/game/')[1])
      let gameNum = pageArr[i].mainFrame().url().split('/game/')[1]
      let GameNumber = pageArr[i].mainFrame().url().split('/game/')[1].split('/?')[0] // 取得遊戲編號
      console.log('GAMENUM: ', gameNum)
      console.log('GAMENUMBER: ', GameNumber)
      try {
        await pageArr[i].waitForSelector('#game canvas', { timeout: 20000 })
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
    if (userData.tab < 5) {  // 跑的數量<5的時候
      await pageArr[0].waitFor(23000)
    } else { await pageArr[0].waitFor(20000) }

    for (let i = 0; i < pageArr.length; i++) {
      await pageArr[i].bringToFront()
      await pageArr[i].waitFor(1500)
      GameNumber = pageArr[i].mainFrame().url().split('/game/')[1].split('/?')[0]
      let GameLang = pageArr[i].mainFrame().url().split('/?language=')[1].split('&token')[0]
      await pageArr[i].screenshot({ path: `./photo/normal${GameNumber}${GameLang}.png` })
      await pageArr[i].waitFor(1000)
      await pageArr[i].mouse.click(750, 357, { button: "left" })  // auto
      await pageArr[i].waitFor(1000)
      await pageArr[i].screenshot({ path: `./photo/auto${GameNumber}${GameLang}.png` })
      await pageArr[i].waitFor(500)
      await pageArr[i].mouse.click(756, 429, { button: "left" })  // 選籌碼
      await pageArr[i].waitFor(800)
      await pageArr[i].mouse.click(511, 243, { button: "left" })  // 選擇右上角乘數
      await pageArr[i].waitFor(1000)
      await pageArr[i].screenshot({ path: `./photo/select${GameNumber}${GameLang}.png` })
      await pageArr[i].waitFor(700)
      await pageArr[i].mouse.click(756, 429, { button: "left" })  // 選籌碼
      await pageArr[i].waitFor(500)
      await pageArr[i].mouse.click(250, 230, { button: "left" })  // 選0.25
      await pageArr[i].waitFor(1000)
      await pageArr[i].screenshot({ path: `./photo/selectPoint${GameNumber}${GameLang}.png` })
      await pageArr[i].waitFor(500)
      await pageArr[i].mouse.click(756, 275, { button: "left" })  // SPIN
      await pageArr[i].waitFor(500)
      await pageArr[i].mouse.click(756, 275, { button: "left" })  // SPIN
      await pageArr[i].waitFor(1000)
      await pageArr[i].screenshot({ path: `./photo/spin${GameNumber}${GameLang}.png` })
      await pageArr[i].waitFor(2000)
      await pageArr[i].goBack(); // 離開
      //關閉重取url
      await pageArr[i].waitFor(2000)
      try {
        console.log('click2: ' + GameNum[(Number(userData.start) + Number(i))])
        await pageArr[i].click(GameNum[(Number(userData.start) + Number(i))])
        await pageArr[i].waitForSelector('#game canvas')
        await pageArr[i].waitFor(7000)
        await pageArr[i].mouse.click(43, 498, { button: "left" })  // menu
        await pageArr[i].waitFor(1000)
        await pageArr[i].mouse.click(43, 285, { button: "left" })  // 幣別切換鈕
        await pageArr[i].waitFor(1500)
        await pageArr[i].screenshot({ path: `./photo/point${GameNumber}${GameLang}.png` })
        await pageArr[i].mouse.click(43, 285, { button: "left" })  // 幣別切換鈕
        await pageArr[i].waitFor(1000)
        await pageArr[i].mouse.click(43, 220, { button: "left" }) // 細單(開發站)
        await pageArr[i].waitForSelector('iframe')
        await pageArr[i].waitFor(3000)
        const elementHandle = await pageArr[i].$('body iframe')
        const frame = await elementHandle.contentFrame()
        // await console.log('細單')
        await frame.waitForSelector('#result > div > div.result-content > div:nth-child(2) > div > div.el-table__body-wrapper.is-scrolling-none > table > tbody > tr:nth-child(1) > td.el-table_1_column_1.is-center > div > span')
        await pageArr[i].waitFor(6000) // 等待細單總表載入
        await frame.click('#result > div > div.result-content > div:nth-child(2) > div > div.el-table__body-wrapper.is-scrolling-none > table > tbody > tr:nth-child(1) > td.el-table_1_column_1.is-center > div > span')
        await pageArr[i].waitFor(5000)
        GameNumber = pageArr[i].mainFrame().url().split('/game/')[1].split('/?')[0]
        GameLang = pageArr[i].mainFrame().url().split('/?language=')[1].split('&token')[0]
        await pageArr[i].screenshot({ path: `./photo/detail${GameNumber}${GameLang}.png` })
        await pageArr[i].waitFor(1000)
        await frame.click('#detail > div.closeBtn > img') // 關閉細單內容
        await pageArr[i].waitFor(3000)
        await frame.click('#result > div > div.closeBtn > img')
        await pageArr[i].waitFor(1000)
        await pageArr[i].mouse.click(52, 580, { button: "left" }) // 關閉細單
        await pageArr[i].waitFor(1000)
        await pageArr[i].mouse.click(43, 133, { button: "left" })  // 離開按鈕
        await pageArr[i].waitFor(1500)
        await pageArr[i].screenshot({ path: `./photo/leave${GameNumber}${GameLang}.png` })
        await pageArr[i].waitFor(600)
        await pageArr[i].close()
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
    }
    await browser.close()
    return true
  })()
  return true
}
module.exports = {
  headless
}