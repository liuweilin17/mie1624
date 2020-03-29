const { LinkedinScraper, events } = require('linkedin-jobs-scraper');
var WebSocketServer = require('websocket').server;
var http = require('http');

webSocketsServerPort = 1337;
// list of currently connected clients (users)
var clients = [];


var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(webSocketsServerPort, function() { 
  console.log((new Date()) + " Server is listening on port "
      + webSocketsServerPort);
});

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);
  var index = clients.push(connection) - 1;
  console.log((new Date()) + ' Connection accepted.');

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      // process WebSocket message
      console.log('message:', message.utf8Data);
      var msgObj = JSON.parse(message.utf8Data);
      var location = msgObj.location;
      var query = msgObj.query;
      search_jobs(location, query, this);
    }
  });

  connection.on('close', function(connection) {
    // close user connection
    console.log('close: connection');
  });
});

async function search_jobs(location, query, connection){
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
      var job = {
          "Query": query, // your input
          "Location": location, // your input
          "Title": title,
          "Company": company,
          "Place": place,
          "Link": link,
          "Length": description.length,
          "Description": description
      };
      job_str = JSON.stringify(job);
      console.log(job_str);
      connection.sendUTF(job_str);
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
          query,
          location,
          {
            paginationMax: 1,
            descriptionProcessor,
          }
      )
  ]);

  // Close browser
  await scraper.close();
  connection.close();
}

