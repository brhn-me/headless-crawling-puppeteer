const puppeteer = require("puppeteer")
const fs = require("fs/promises")


async function start() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage()
  await page.goto(process.env.EDUCATIVE_LIVE_VM_URL);

   const photos = await page.$$eval("img", imgs => {
     return imgs.map(x => x.src)
   })
   for (const photo of photos) {
     const imagepage = await page.goto(photo)
     await fs.writeFile(photo.split("/").pop(), await imagepage.buffer())
   }

  await browser.close()
}

start()