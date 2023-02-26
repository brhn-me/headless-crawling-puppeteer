const puppeteer = require("puppeteer")
const fs = require("fs/promises")
const cron = require('node-cron')


async function start() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage()
  await page.goto(process.env.EDUCATIVE_LIVE_VM_URL);

  await page.screenshot({path: 'screenshot.png', fullPage:true , waitUntil: "domcontentloaded"});

  await browser.close()
}

//setInterval(start,20000)
cron.schedule("*/5 * * * * *", start)