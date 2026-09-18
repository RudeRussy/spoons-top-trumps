const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const wait = ms => new Promise(r => setTimeout(r, ms));
const filePath = 'http://127.0.0.1:8765/index.html';
const BOARD_API = 'https://textdb.online/spoons-board-v2';
const EXISTING_NAME = 'LIV93';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'], protocolTimeout: 120000 });
  const errors = [];
  const results = {};

  async function freshPage(){
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    page.on('pageerror', err => errors.push('pageerror: ' + err.message));
    // network failures are expected in the offline test; only uncaught page errors should fail the run
    page.on('requestfailed', req => { /* expected during offline test */ });
    await page.goto(filePath, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.getElementById('buildChip').textContent !== '—', { timeout: 10000 });
    return { context, page };
  }

  // ===== (a) body scroll lock for spoonsPanel =====
  {
    let { context, page } = await freshPage();
    results.build = await page.evaluate(() => document.getElementById('buildChip').textContent);
    await page.evaluate(() => openSpoonsPanel());
    await page.waitForFunction(() => !document.getElementById('spoonsPanel').classList.contains('hidden'), { timeout: 5000 });
    await wait(200);
    const overflowOpen = await page.evaluate(() => document.body.style.overflow);
    await page.evaluate(() => closeSpoonsPanel());
    await wait(200);
    const overflowClosed = await page.evaluate(() => document.body.style.overflow);
    results.bodyLock = { open: overflowOpen, closed: overflowClosed, ok: overflowOpen === 'hidden' && overflowClosed === '' };
    await context.close();
  }

  // ===== (b) signup name-taken against cloud account =====
  {
    let { context, page } = await freshPage();
    await page.evaluate(() => openOrderPanel(true));
    await page.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 5000 });
    await wait(300);
    // try to sign up with an existing cloud handle (no PIN needed for taken check)
    await page.evaluate(name => {
      document.getElementById('signupName').value = name;
      document.getElementById('signupPub').value = 'SOME LOCAL';
      document.getElementById('signupPin').value = '1234';
      doSignup();
    }, EXISTING_NAME);
    await page.waitForFunction(() => {
      const err = document.getElementById('signupNameError');
      return err && err.style.display !== 'none' && err.textContent.includes('TAKEN');
    }, { timeout: 15000 });
    const errText = await page.evaluate(() => document.getElementById('signupNameError').textContent);
    results.nameTaken = { text: errText, ok: errText.includes('NAME TAKEN') };
    await context.close();
  }

  // ===== (c) stat tap targets >= 44px =====
  {
    let { context, page } = await freshPage();
    await page.click('#btnArcade');
    await page.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
    const handle = 'T' + Math.floor(Math.random() * 100000);
    await page.evaluate(h => { document.getElementById('signupName').value = h; document.getElementById('signupPub').value = 'TEST LOCAL'; document.getElementById('signupPin').value = '1234'; doSignup(); }, handle);
    await page.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), { timeout: 15000 });
    await wait(300);
    await page.waitForSelector('#playerCard .stat', { timeout: 10000 });
    const statInfo = await page.evaluate(() => {
      const btn = document.querySelector('#playerCard button.stat');
      if (!btn) return null;
      const r = btn.getBoundingClientRect();
      const h = parseFloat(window.getComputedStyle(btn).minHeight);
      return { rectHeight: r.height, minHeight: h };
    });
    results.statTarget = statInfo;
    results.statTargetOk = statInfo && statInfo.rectHeight >= 40 && statInfo.minHeight >= 44;
    await context.close();
  }

  // ===== (e) playlist mode: after track ends, src advances and toast fires =====
  {
    let { context, page } = await freshPage();
    await page.evaluate(() => {
      AudioFX.unlock();
      AudioFX.startMusic();
    });
    await wait(400);
    const before = await page.evaluate(() => {
      const a = document.querySelector('audio[data-src]');
      return { src: a ? a.dataset.src : null, track: AudioFX.trackName() };
    });
    // force ended event by seeking near the end or directly dispatching it
    await page.evaluate(async () => {
      const a = document.querySelector('audio[data-src]');
      if (a){
        try {
          a.pause();
          a.currentTime = Math.max(0, (a.duration || 0) - 0.05);
          await a.play().catch(() => {});
          await new Promise(r => setTimeout(r, 400));
        } catch(e){}
        // if the seek didn't fire ended, dispatch it manually
        a.dispatchEvent(new Event('ended'));
      }
      await new Promise(r => setTimeout(r, 600));
    });
    const after = await page.evaluate(() => {
      const a = document.querySelector('audio[data-src]');
      return { src: a ? a.dataset.src : null, track: AudioFX.trackName(), loop: a ? a.loop : null };
    });
    // collect toast
    const toastText = await page.evaluate(() => {
      const slot = document.getElementById('bonusToastSlot');
      if (slot && slot.textContent) return slot.textContent;
      const floats = document.querySelectorAll('div[style*="position:fixed"]');
      for (const f of floats) if (f.textContent.includes('TRACK:')) return f.textContent;
      return '';
    });
    results.playlist = {
      beforeSrc: before.src,
      afterSrc: after.src,
      afterTrack: after.track,
      loop: after.loop,
      toast: toastText,
      advanced: before.src && after.src && before.src !== after.src,
      ok: before.src && after.src && before.src !== after.src && toastText.includes('TRACK:') && after.loop === false
    };
    await context.close();
  }

  // ===== (d) game-over with board network blocked shows local-save toast, no page errors =====
  {
    let { context, page } = await freshPage();
    await page.click('#btnArcade');
    await page.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
    const handle = 'T2' + Math.floor(Math.random() * 100000);
    await page.evaluate(h => { document.getElementById('signupName').value = h; document.getElementById('signupPub').value = 'TEST LOCAL'; document.getElementById('signupPin').value = '1234'; doSignup(); }, handle);
    await page.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), { timeout: 15000 });
    await wait(300);
    // block all textdb.online traffic so boardSubmit returns false
    await page.setRequestInterception(true);
    page.on('request', req => {
      if (req.url().includes('textdb.online')) req.abort('internetdisconnected');
      else req.continue();
    });
    // trigger the game-over score submission path directly while board is unreachable
    const submitOk = await page.evaluate(() => { submitMyResult(true); return 'called'; });
    await page.waitForFunction(() => {
      const slot = document.getElementById('bonusToastSlot');
      if (slot && slot.textContent.includes('SYNC WHEN ONLINE')) return true;
      const floats = document.querySelectorAll('div[style*="position:fixed"]');
      for (const f of floats) if (f.textContent.includes('SYNC WHEN ONLINE')) return true;
      return false;
    }, { timeout: 25000 });
    const toastText = await page.evaluate(() => {
      const slot = document.getElementById('bonusToastSlot');
      if (slot && slot.textContent) return slot.textContent;
      const floats = document.querySelectorAll('div[style*="position:fixed"]');
      for (const f of floats) if (f.textContent.includes('SYNC')) return f.textContent;
      return '';
    });
    results.offlineToast = { text: toastText, ok: toastText.includes('SYNC WHEN ONLINE') };
    await context.close();
  }

  await browser.close();

  results.pageErrors = errors;
  results.noPageErrors = errors.length === 0;
  results.ok = results.bodyLock.ok && results.nameTaken.ok && results.statTargetOk && results.offlineToast.ok && results.playlist.ok && results.noPageErrors;
  console.log(JSON.stringify(results, null, 2));
  process.exit(results.ok ? 0 : 1);
})();
