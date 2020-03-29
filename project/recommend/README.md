## Courses Recommendation
Courses Recommendation is a system built for MIE1624 project, able to search and crawl the latest jobs from linkedin, analyze the skills and recommend courses from udemy.

### Techniques
* [NodeJS](https://nodejs.org/en/docs/guides/) in the backend
* [Express web framework](https://expressjs.com/en/starter/installing.html)
* JavaScript and [JQuery](https://jquery.com/) in the front end
* [Bootstrap](https://getbootstrap.com/) and [Highcharts](https://www.highcharts.com/docs/getting-started/installation) for visualization
* [Websocket](https://www.npmjs.com/package/websocket) in NodeJS for incremental message.

### Modules
* Crawling server. The ```server.js``` create a websocket server and crawl data from linkedin given the query and location.
* Web server. The ```app.js``` is the starting file for the web.

### Install
```npm install --save```

### Running
* crawler server: 
```
nodemon server.js
```
* Web server: 
```
npm start

```

### References
* [Node.js & WebSocket — Simple chat tutorial](https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61)
* [Node.js Linkedin Crawling](https://github.com/spinlud/linkedin-jobs-scraper)