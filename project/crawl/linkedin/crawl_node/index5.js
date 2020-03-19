const { LinkedinScraper, events, } = require("linkedin-jobs-scraper");

(async () => {
    // Programatically disable logger
    setTimeout(() => LinkedinScraper.disableLogger(), 5000);

    // Each scraper instance is associated with one browser.
    // Concurrent queries will be runned on different pages within the same browser instance.
    const scraper = new LinkedinScraper({
        headless: true,
        slowMo: 10,
    });

    // Listen for custom events
    scraper.on(events.custom.data, ({ query, location, link, title, company, place, description, }) => {
        var ret = {
            "Query": query, // your input
            "Location": location, // your input
            "Title": title,
            "Company": company,
            "Place": place,
            "Link": link,
            "Length": description.length,
            "Description": description
        };
        ret_str = JSON.stringify(ret)
        console.log(ret_str);
        // console.log(
        //     description.length,
        //     `Query='${query}'`,
        //     `Location='${location}'`,
        //     `Title='${title}'`,
        //     `Company='${company}'`,
        //     `Place='${place}'`,
        //     `Link='${link}'`,
        //     `Description='${description}'`
        // );
    });

    scraper.on(events.custom.error, (err) => { });
    scraper.on(events.custom.end, () => { });

    // Listen for puppeteer specific browser events
    scraper.on(events.puppeteer.browser.targetcreated, () => { });
    scraper.on(events.puppeteer.browser.targetchanged, () => { });
    scraper.on(events.puppeteer.browser.targetdestroyed, () => { });
    scraper.on(events.puppeteer.browser.disconnected, () => { });

    // This will be executed on browser side
    const descriptionProcessor = () => document.querySelector(".description__text")
    // const descriptionProcessor = () => document.querySelector(".jobs-description-content")
            .innerText
            .replace(/[\s\n\r]+/g, " ")
            .trim();

    // Run queries concurrently
    await Promise.all([
        scraper.run(
            "data analyst",
            "Canada",
            {
                paginationMax: 100,
                descriptionProcessor,
            }
        )
    ]);

    // Close browser
    await scraper.close();
})();