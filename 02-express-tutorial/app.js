const http = require('http')

const server = http.createServer((req, res)=>{

    res.writeHead(200, {'content-type': 'text/html'})
    res.write(`<h2> This is it boys! </h2>` )



    console.log('server is on')

    res.end()
})


server.listen(5000)