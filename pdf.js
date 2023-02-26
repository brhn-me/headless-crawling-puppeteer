const puppeteer = require('puppeteer')
 
async function getPDF() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(process.env.EDUCATIVE_LIVE_VM_URL);   
 await page.emulateMediaType('screen');
   
const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });
  await browser.close();
 }

getPDF()