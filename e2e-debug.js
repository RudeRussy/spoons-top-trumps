const puppeteer = require('puppeteer');
const path = require('path');

const wait = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  const filePath = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => document.getElementById('buildChip').textContent !== '—', { timeout: 10000 });
  console.log('build', await page.evaluate(() => document.getElementById('buildChip').textContent));

  // Start arcade -> signup panel
  await page.click('#btnArcade');
  await page.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
  await wait(300);

  // Fill signup
  await page.evaluate(() => {
    const n = document.getElementById('signupName');
    const p = document.getElementById('signupPub');
    if (n && p) {
      n.value = 'TEST' + Math.floor(Math.random() * 10000);
      p.value = 'TEST LOCAL';
      doSignup();
    } else {
      console.log('NO SIGNUP FIELDS');
    }
  });
  await wait(500);

  // Wait for table
  await page.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), { timeout: 15000 });
  console.log('table visible');

  // Click stat
  await page.waitForSelector('#playerCard button.stat', { timeout: 10000 });
  await page.click('#playerCard button.stat[data-stat="kcal"]');
  await page.waitForFunction(() => document.getElementById('btnNext'), { timeout: 10000 });

  // Next centre
  const nextBox = await page.evaluate(() => {
    const b = document.getElementById('btnNext');
    const r = b.getBoundingClientRect();
    return { x: r.left, y: r.top, width: r.width, center: r.left + r.width / 2 };
  });
  console.log('next box', nextBox, 'centred?', Math.abs(nextBox.center - 195) <= 20);

  await page.screenshot({ path: path.join(__dirname, 'debug.png'), fullPage: true });
  await browser.close();
})();
