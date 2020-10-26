const puppeteer = require('puppeteer');
const global = require('./Function/global');
const { resolve } = require('path');
const { count } = require('console');
const Lobby = require('./Element/element').Lobby
const fs = require('fs')
// const { stdout, stderr } = require('process')

async function headless (userData, url, site) {
  site === 1 ? site = '' : site = ''
  var GameNum = require('./Variable/variable' + site).gameNum
  let errorResult = []
  await (async () => {
    await console.log(`${new Date().getHours()} : ${new Date().getMinutes()}`)
    // await console.log(userData.start)
    const browser = await puppeteer.launch({
      args: [
        '--window-size=960,840'
      ],
        headless: false
        // headless: true
    });
    let pageArr = [] // 要開的tab陣列
    await pageArr.push((await browser.pages())[0])
    for (let i = 1; i < userData.tab; i++) {
      await pageArr.push(await browser.newPage())
    }
    // console.log(pageArr.length + '頁')
    for (let i = 0; i < pageArr.length; i++) {
      // await pageArr[i].setDefaultNavigationTimeout(0)
      await pageArr[i].goto(url)
    }
    await pageArr[0].waitFor(10000)
    for(let i = 0; i < pageArr.length; i++) {
      await pageArr[i].bringToFront()
      await pageArr[i].waitFor(1500)
      // console.log(GameNum[userData.start + i])
      await pageArr[i].click(GameNum[(Number(userData.start) + Number(i))])  // 點選遊戲
      await pageArr[i].waitFor(2000)
      let GameNumber = pageArr[i].mainFrame().url().split('/game/')[1].split('/?')[0] // 取得遊戲編號
      try {
        await pageArr[i].waitForSelector('#game canvas', {timeout: 3000})
        await pageArr[i].waitFor(15000)
      } catch (error) {
        if (error) {
          await fs.mkdir('./遊戲連結錯誤',async function () {
            errorResult.push(GameNumber +' : '+ error + '\n')
            await fs.writeFile('./遊戲連結錯誤/404.txt', errorResult, function(err) {
              console.log('已寫入 遊戲連結.txt')
            })
          })
        }
      }
    }
    errorResult.length = 0
    if (userData.tab < 5) {  // 跑的數量<5的時候
      await pageArr[0].waitFor(25000)
    } else { await pageArr[0].waitFor(15000) }

    for ( let i = 0; i < pageArr.length; i++ ) {
      await pageArr[i].bringToFront()
      await pageArr[i].waitFor(1000)
      await pageArr[i].mouse.click(756, 205, {button: "left"})  // +
      await pageArr[i].waitFor(1000)
      await pageArr[i].mouse.click(756, 339, {button: "left"})  // -
      await pageArr[i].waitFor(1000)
      await pageArr[i].mouse.click(756, 387, {button: "left"})  // auto
      await pageArr[i].waitFor(1000)
      await pageArr[i].mouse.click(756, 436, {button: "left"})  // 選籌碼
      await pageArr[i].waitFor(500)
      await pageArr[i].mouse.click(756, 436, {button: "left"})  // 選籌碼
      await pageArr[i].waitFor(1000)
      await pageArr[i].mouse.click(756, 271, {button: "left"})  // SPIN
      await pageArr[i].waitFor(1000)
      await pageArr[i].mouse.click(756, 271, {button: "left"})  // SPIN
      await pageArr[i].waitFor(700)
      let GameNumber = pageArr[i].mainFrame().url().split('/game/')[1].split('/?')[0]
      // await console.log(GameNumber)
      await pageArr[i].screenshot({path: `./photo/spin${GameNumber}${userData.lang}.png`})
      await pageArr[i].goBack();
      //關閉重取url
      await pageArr[i].waitFor(2000)
      try {
        await pageArr[i].click(GameNum[(Number(userData.start) + Number(i))])
        await pageArr[i].waitForSelector('#game canvas')
        // await pageArr[i].waitFor(5000)
        await pageArr[i].waitFor(3000)
        await pageArr[i].mouse.click(43, 504, {button: "left"})  // menu
        await pageArr[i].waitFor(1000)
        await pageArr[i].screenshot({path: `./photo/menu${GameNumber}${userData.lang}.png`})
        await pageArr[i].waitFor(1000)
        await pageArr[i].mouse.click(43, 285, {button: "left"})  // 幣別切換鈕
        await pageArr[i].waitFor(1000)
        await pageArr[i].screenshot({path: `./photo/point${GameNumber}${userData.lang}.png`})
        await pageArr[i].mouse.click(43, 285, {button: "left"})  // 幣別切換鈕
        await pageArr[i].waitFor(1000)
        // await pageArr[i].mouse.click(43, 275, {button: "left"})  // 細單(正式站)
        await pageArr[i].mouse.click(43, 220, {button: "left"}) // 細單(開發站)
        await pageArr[i].waitFor(2000)
        await pageArr[i].waitForSelector('iframe')
        await pageArr[i].waitFor(3000)
        const elementHandle = await pageArr[i].$('body iframe')
        const frame = await elementHandle.contentFrame()
        // await console.log('細單')
        await frame.waitForSelector('#result > div > div.result-content > div:nth-child(2) > div > div.el-table__body-wrapper.is-scrolling-none > table > tbody > tr:nth-child(1) > td.el-table_1_column_1.is-center > div > span')
        await pageArr[i].waitFor(3000) // 等待細單總表載入
        await frame.click('#result > div > div.result-content > div:nth-child(2) > div > div.el-table__body-wrapper.is-scrolling-none > table > tbody > tr:nth-child(1) > td.el-table_1_column_1.is-center > div > span')
        await pageArr[i].waitFor(5000)
        GameNumber = pageArr[i].mainFrame().url().split('/game/')[1].split('/?')[0]
        await pageArr[i].screenshot({path: `./photo/detail${GameNumber}${userData.lang}.png`})
        await frame.click('#detail > div.closeBtn > img')
        await pageArr[i].waitFor(10000)
        await frame.click('#result > div > div.closeBtn > img')
        await pageArr[i].waitFor(1000)
        await pageArr[i].mouse.click(52, 580, {button: "left"})
        await pageArr[i].close()
        await console.log(`${new Date().getHours()} : ${new Date().getMinutes()}`)
      } catch (error) {
        if (error) {
          await fs.mkdir('./遊戲連結錯誤',async function () {
            errorResult.push(GameNumber +' : '+ error + '\n')
            await fs.writeFile('./遊戲連結錯誤/細單錯誤.txt', errorResult, function(err) {
              console.log('已寫入 遊戲連結.txt')
            })
          })
        }
      }
    }
    await browser.close()
  })()
    return true
  }
module.exports = {
  headless
}