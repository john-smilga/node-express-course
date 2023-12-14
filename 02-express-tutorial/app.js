const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url == "/contact") {
    res.writeHead(400, { "content-type": "text/html" });
    res.end("<h1> Page Not Found</h1>");
  }
  if (url == "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1> this is about page</h1>");
  }

  res.writeHead(200, { "content-type": "text/html" });
  res.write("<h1>Welcome</h1>");
  res.end();
});

server.listen(4000);
