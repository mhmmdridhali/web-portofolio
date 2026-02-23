const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => {
        if (msg.type() === 'error' || msg.type() === 'warning') {
            const text = msg.text();
            if (text.includes('hydration') || text.includes('hydrated') || text.includes('React') || text.includes('Warning') || text.includes('mismatch')) {
                console.log('BROWSER ERROR:', text);
            }
        }
    });

    try {
        await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
        await new Promise(r => setTimeout(r, 3000));

        await page.goto('http://localhost:3000/portfolio', { waitUntil: 'domcontentloaded', timeout: 30000 });
        await new Promise(r => setTimeout(r, 3000));
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
