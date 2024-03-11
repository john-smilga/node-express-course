const http = require("http");
const { readFileSync } = require("fs");

// get all the files
const homePage = readFileSync("./navbar-app/index.html");
const stylesPage = readFileSync("./navbar-app/styles.css");
const logo = readFileSync("./navbar-app/logo.svg");
const logicFile = readFileSync("./navbar-app/browser-app.js");

// https://nodejs.org/docs/latest/api/http.html#responseenddata-encoding-callback
// docs related to status code : https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
const server = http.createServer((req, res) => {
  // home page
  if (req.url === "/") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.write(homePage);
    res.end();
  } else if (req.url === "/styles.css") {
    res.writeHead(200, {
      "content-type": "text/css",
    });
    res.write(stylesPage);
    res.end();
  } else if (req.url === "/logo.svg") {
    res.writeHead(200, {
      "content-type": "image/svg+xml",
    });
    res.write(logo);
    res.end();
  } else if (req.url === "/browser-app.js") {
    res.writeHead(200, {
      "content-type": "text/js",
    });
    res.write(logicFile);
    res.end();
  }
  // about page
  else if (req.url === "/about") {
    res
      .writeHead(200, {
        "content-type": "text/html",
      })
      .end("<h2>This is About page</h2>");
  }
  // 404 page
  else {
    res
      .writeHead(404, {
        "content-type": "text/html",
      })
      .end("<h2>Page not found.</h2>");
  }
});

// port is just a communication endpoint
// learn more : https://en.wikipedia.org/wiki/Port_(computer_networking)
server.listen(5000, () => {
  console.log("Server is listening on port : 5000");
});
