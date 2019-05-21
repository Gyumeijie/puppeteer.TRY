const puppeteer = require('puppeteer');
const sendEmail = require('./email');

let tries = 0;

const checker = async (configs) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const { login, email } = configs;
  const MAX_RETRY_TIMES = 10;

  try {
    // Home page
    console.info('home page...');
    await page.goto('http://grs.zju.edu.cn/allogene/page/home.htm');

    // Authorization
    console.info('authorization...');
    const href = await page.$eval('a[class="zjuam unitPng"]', (el) => el.getAttribute('href'));
    await page.goto(href);
    await page.type('#username', login.username);
    await page.type('#password', login.password);
    await page.click('#dl');

    // Degree page
    console.info('check degree page...');
    await page.goto('http://grs.zju.edu.cn/degree/page/xwsq/stu_xwsq_result.htm');
    const itemCount = await page.evaluate(() => {
      const div = document.querySelectorAll(
        'div[class="degreeblock"] div[class="control-group degreetable-bg"]'
      )[1];
      const ul = div.firstElementChild;
      return ul.childElementCount;
    });

    // Sending email
    console.info('sending email...');
    if (itemCount === 3) {
      sendEmail('isAlive', email);
    } else {
      // Scoll to the degree block view
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      await page.screenshot({ path: 'result.png' });
      sendEmail('result', email);
    }

    await browser.close();
  } catch (err) {
    // TimeoutError: Navigation Timeout Exceeded: 30000ms exceeded
    if (tries < MAX_RETRY_TIMES) {
      checker(configs);
      tries = tries + 1;
    } else {
      process.exit(0);
    }
  }
};

module.exports = checker;
