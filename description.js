const puppeteer = require("puppeteer")
const fs = require("fs/promises")


async function start() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage()
  await page.goto(process.env.EDUCATIVE_LIVE_VM_URL);

const text = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".mt-2")).map(x => x.textContent)
  })
  await fs.writeFile("description.txt", text.join("\r\n"))

  await browser.close()
}
start()