//@ts-check
const { chromium } = require("playwright-chromium");
const { expect } = require('chai');


let browser;
let context;
let page;

describe("E2E tests",  function () {
    this.timeout(6000);

   
    before(async () => {
        // browser = await chromium.launch({ headless: false, slowMo: 500 });
        browser = await chromium.launch();

    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();

        // block intensive resources and external calls (page routes take precedence)
        await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
        await context.route(url => {
            return url.hostname != 'localhost';
        }, route => route.abort());

        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    it("load article titles", async () => {
        await page.goto("http://localhost:5500");
        await page.click('text=Login')
        await page.fill('input[name=email]', 'peter@abv.bg')
        await page.fill('input[name=password]', '123456')
        await page.click('input[value=Login]')
        //  await page.screenshot({ path: "site.png" });
        // const content = await page.textContent("#main");
        // expect(content).to.contain("Easy Lasagna");
        // expect(content).to.contain("Grilled Duck Fillet");
        // expect(content).to.contain("Roast Trout");
        // // expect(content).to.contain("ALGOL");
      });

 

});
