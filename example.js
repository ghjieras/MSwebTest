const puppeteer = require('puppeteer');
const global = require('./Function/global');
const Lobby = require('./Element/element').Lobby
const GameNum = require('./Variable/variable').gameNum
// const { stdout, stderr } = require('process')

async function headless (userData, url) {
  (async () => {
    const browser = await puppeteer.launch({
      args: [
        '--window-size=960,840'
      ],
      headless: false
    });
    const page = (await browser.pages())[0];
    await page.setViewport({ width: 960, height: 840 })
    await page.setDefaultNavigationTimeout(0)
    await page.goto(url)
    await page.waitForSelector(Lobby.gameList,{visible: true, timeout: 30000})
    // await page.waitFor(15000)
    console.log(process.pid + ':' + GameNum[userData.gameNum])
    await page.click(GameNum[userData.gameNum])
    await page.waitFor(70000) // 等待70秒載入   
    await page.screenshot({path: `./photo/intoGame${userData.gameNum}.png`})
    // await page.waitFor(1000)
    await page.mouse.click(911, 307, {button: "left"})  // +
    await page.waitFor(1000)
    await page.mouse.click(911, 465, {button: "left"})  // -
    await page.waitFor(1000)
    await page.mouse.click(911, 524, {button: "left"})  // auto
    await page.waitFor(1000)
    await page.mouse.click(911, 583, {button: "left"})  // 選籌碼
    await page.mouse.click(911, 583, {button: "left"})  // 選籌碼
    await page.waitFor(1000)
    await page.mouse.click(911, 388, {button: "left"})  // SPIN
    await page.waitFor(1000)
    await page.screenshot({path: `./photo/spining${userData.gameNum}.png`})
    // await page.reload(url)
    // await page.evaluate(() => {
    //   location.reload()
    // })
    await page.goBack();
    //關閉重取url
    await page.waitFor(3000)
    console.log(process.pid + ':' + GameNum[userData.gameNum])
    await page.click(GameNum[userData.gameNum])
    await page.waitFor(10000)
    await page.mouse.click(52, 664, {button: "left"})  // menu
    await page.waitFor(1000)
    // await page.screenshot({path: './photo/menu.png'})
    // await page.waitFor(2000)
    await page.mouse.click(52, 408, {button: "left"})  // 細單
    await page.setDefaultNavigationTimeout(0)
    await page.waitForSelector('iframe')
    await page.waitFor(4000)
    const elementHandle = await page.$('body iframe')
    const frame = await elementHandle.contentFrame()
    // console.log('細單')
    await frame.waitFor(2000)
    await frame.waitForSelector('#result > div > div.result-content > div:nth-child(2) > div > div.el-table__body-wrapper.is-scrolling-none > table > tbody > tr:nth-child(1) > td.el-table_1_column_1.is-center > div > span')
    await page.waitFor(1000)
    await frame.click('#result > div > div.result-content > div:nth-child(2) > div > div.el-table__body-wrapper.is-scrolling-none > table > tbody > tr:nth-child(1) > td.el-table_1_column_1.is-center > div > span')
    await page.waitFor(2000)
    await page.screenshot({path: `./photo/detail${userData.gameNum}.png`})
    await frame.click('#detail > div.closeBtn > img')
    await page.waitFor(1000)
    await frame.click('#result > div > div.closeBtn > img')
    await page.waitFor(1000)
    await page.mouse.click(52, 580, {button: "left"})
    await page.waitFor(1000)
    await page.screenshot({path: `./photo/description${userData.gameNum}.png`})
    await page.waitFor(1000)
    for(let i = 0; i <= 5; i++) {
      await page.mouse.click(950, 418, {button: "left"}) 
      await page.waitFor(1000)
    }
    for(let i = 0; i <= 5; i++) {
      await page.mouse.click(10, 418, {button: "left"})
      await page.waitFor(1000)
    }
    await page.mouse.click(925, 675, {button: "left"})
    await page.waitFor(1000)
    await page.close()
    return true
  })();
}

module.exports = {
  headless
}