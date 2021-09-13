const puppeteer = require('puppeteer');
const global = require('./Function/global');


var userDeta = {
  user: 'ttt005',
  site: 1,
  lang: 6
}


async function playScriptTest(url) {
  (async () => {
    console.log(`Start: ${new Date().getHours()}:${new Date().getMinutes()}`)
    const browser = await puppeteer.launch({
      args: [
        // '--disable-dev-shm-usage'
        `--window-size=800,600`
      ],
      defaultViewport: null,
      ignoreHTTPSErrors: true,
      ignoreDefaultArgs: ['--disable-extensions'],
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(15000)


    for (let i = 0; i <= 1500; i++) {
      await page.mouse.click(756, 212, {
        button: "left"
      }) // SPIN
      await page.waitFor(1000)
      await page.mouse.click(756, 212, {
        button: "left"
      }) // SPIN
      await page.waitFor(2000)
      await page.mouse.click(378, 212, {
        button: "left"
      }) // 點中間
      await page.waitFor(800)
      await page.mouse.click(756, 212, {
        button: "left"
      }) // SPIN
      await page.waitFor(1000)
    }
    await page.screenshot({
      path: `./playSctipt/game.png`
    })
    await browser.close();
    console.log(`END: ${new Date().getHours()}:${new Date().getMinutes()}`)
  })()
}


var getUrl = new Promise(async function (resolve) {
  resolve(await global.getUrlFormAPI(userDeta.user, userDeta.site, 18, userDeta.lang))
})

getUrl.then(url => {
  playScriptTest(url)
})

Promise.all([])