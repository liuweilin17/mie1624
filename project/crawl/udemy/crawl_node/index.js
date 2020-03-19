const puppeteer = require('puppeteer');
var fs = require("fs");

var myurl = 'https://www.udemy.com/courses/development/data-science/';

var myArgs = process.argv.slice(2);
var pageN = myArgs[0];
myurl = myurl + '?p=' + pageN;
var fname = 'data/hackson' + pageN + '.json';
//console.log(myurl);
//console.log(fname);

(async () => {
    try {
      // open the headless browser
      var browser = await puppeteer.launch({ 
            headless: false, 
            slowMo: 30, 
            //executablePath: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary',
            //userDataDir: '/Users/liuweilin/Library/Application\ Support/Google/Chrome\ Canary/',
        });
      // open a new page
      var page = await browser.newPage();

    //   var cookie = [ // cookie exported by google chrome plugin editthiscookie
    //     {
    //         "domain": "udemy.com",
    //         "expirationDate": 1597288045,
    //         "hostOnly": false,
    //         "httpOnly": false,
    //         "name": "key",
    //         "path": "/",
    //         "sameSite": "no_restriction",
    //         "secure": false,
    //         "session": false,
    //         "storeId": "0",
    //         "value": "value!",
    //         "id": 1
    //     }
    //     ];
    //     await page.setCookie(cookie);

      // enter url in page
      await page.goto(myurl);
      // await page.waitForSelector("div.curriculum-course-card--container--1ZgwU", timeout=0);
      // await page.waitForSelector("a[data-purpose='search-course-card-title']");
        
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("ratings")'
      );
      var news = await page.evaluate(() => {
        var titleNodeList = document.querySelectorAll("div.curriculum-course-card--container--1ZgwU");
        // var linkNodeList = document.querySelectorAll("a[data-purpose='search-course-card-title']");
        // var titleNodeList = document.querySelectorAll("div");
        // var ageList = document.querySelectorAll("div.curriculum-course-card--container--1ZgwU");
        // var scoreList = document.querySelectorAll(`span.score`);
        var titleLinkArray = [];
        for (var i = 0; i < titleNodeList.length; i++) {
          titleLinkArray[i] = {
            title: titleNodeList[i].innerText.trim(),
            link: "https://www.udemy.com" + titleNodeList[i].querySelector("a").getAttribute("href"),
            // age: ageList[i].innerText.trim(),
            // score: scoreList[i].innerText.trim()
          };
        }
        return titleLinkArray;
      });
      var l = news.length;
      if(l == 0){
          console.log(pageN);
      }
    // Writing the news inside a json file
      fs.writeFile(fname, JSON.stringify(news), function(err) {
        if (err) {
            console.log('throw err');
            throw err;
        }
        // console.log("Saved!");
        });
       await browser.close();

      // console.log(news);
    } catch (err) {
      // Catch and display errors
      console.log(err);
      await browser.close();
      //console.log(error("Browser Closed"));
    }
  })();

