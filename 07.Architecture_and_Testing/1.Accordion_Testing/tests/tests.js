const { chromium } = require("playwright-chromium");
const { expect } = require("chai");

// (async () => {
//     const browser = await chromium.launch()
//     const page = await browser.newPage()
//     await page.goto('https://google.com/')
//     await page.screenshot({path: `example.png`})
//     await browser.close()
// })()

let browser, page; // Declare reusable variables

describe("E2E tests", async function () {
  this.timeout(5000);

  before(async () => {
    browser = await chromium.launch(); // headless: false will show us the test steps
    // sloMo: 2000 will make the tests wait between operations
  });
  after(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => {
    await page.close();
  });

  it("load article titles", async () => {
    await page.goto("http://localhost:5500");
    // await page.click('text=More')
    // await page.screenshot({ path: "site.png" });
    const content = await page.textContent("#main");
    expect(content).to.contain("Scalable Vector Graphics");
    expect(content).to.contain("Open standard");
    expect(content).to.contain("Unix");
    expect(content).to.contain("ALGOL");
  });

  it("loads articles", async () => {
    await page.goto("http://localhost:5500");

    await page.click("text=More");
    await page.waitForSelector('.accordion p')
    const visible = await page.isVisible('.accordion p')
    expect(visible).to.be.true
  });

  it("interracts properly with article buttons", async () => {
    await page.goto("http://localhost:5500");

    await page.click("text=More");
    await page.waitForSelector('.accordion p')
    let visible = await page.isVisible('.accordion p')
    expect(visible).to.be.true

    await page.click('text=Less')
    visible = await page.isVisible('.accordion p');
    expect(visible).to.be.false
  });
});
