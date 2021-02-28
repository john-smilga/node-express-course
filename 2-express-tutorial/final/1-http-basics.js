const http = require('http')

const server = http.createServer((req, res) => {
  const url = req.url
  // home page
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write(homePage)
    res.end()
  }
  // about page
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('<h2>About Page</h2>')
    res.end()
  }

  // 404
  else {
    res.writeHead(404, { 'content-type': 'text/html' })
    res.write('<h2>page not found</h2>')
    res.end()
  }
})

server.listen(5000)
