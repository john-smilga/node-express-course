const http = require('http');

// In this call back function we have two parameters. Both of these parameters are objects. The first parameter represents the incoming request. So imagine a client requesting info from a web browser. You will info about the method and other useful info in that request object. The second parameter is the response we are sending back.

const server = http.createServer((req, res)=> {
    if (req.url === '/') {
        res.end('Welcome to our home page')
      } else if (req.url === '/about') {
        res.end('Here is our short history')
      } else {
        res.end(`
        <h1>Oops!</h1>
        <p>We can't seem to find the page you are looking for</p>
        <a href="/">back home</a>
        `)
      }
    })
    
    server.listen(5000)
    

// Notice that when run node we do not exit the file, like before when node was finish executing the code.
// In this case we have a web-server and what does web-servers do? They keep listening for requests. You want your server to always be up.