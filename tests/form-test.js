const puppeteer = require('puppeteer');
const colors = require('colors');
const utils = require('../scripts/utils.js');


/**
  Description: Fills in form

  @param test object containing values to fill in form
  Ex: test[#Email] contains value to be filled in on text input with selector: #email

  @return {bool} true if test succeeds
*/
async function run(test, url, expected_url) {
    const browser = await puppeteer.launch({
      headless: true , //change this to false if you want to see debug test
      slowMo: 15 //play with this value for debugging
    });
    const page = await browser.newPage();

    await page.goto(url);
    await populateForm(test, page);
    const testWorked = (await page.url() == expected_url);
    await browser.close();
    return testWorked;
}

async function populateForm(test, page) {
    for (var selector in test) {
      //Case 1: select
      let [tagName, type] = await page.$eval(selector, el => [el.tagName, el.type]);
      if (tagName == "SELECT") {
      await page.select(selector, test[selector]);
      }
      //Case 2: click
      else if (test[selector] == "click") {
        await page.click(selector);
        await utils.delay(1000); //delay just for security
      }
      //Case 3 type
      else {
        await page.type(selector, test[selector]);
    }
  }
}





module.exports.run = run;
