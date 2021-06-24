const http=require('http')
const { readFileSync} = require('fs')
const homePage = readFileSync('./navbar-app/index.html')
const styles=readFileSync('./navbar-app/styles.css')
const logo = readFileSync('./navbar-app/logo.svg')
const logic=readFileSync('./navbar-app/browser-app.js')

const server=http.createServer((req, res) =>{
    if(req.url==='/'){
        console.log('No More Today')
        res.end('<h1>My name </h1>')}
    else if(req.url==='/about'){
        res.writeHead(200,{'content-type':'text/html'})
        res.write(homePage)
        res.end()
    }
    else if (req.url === '/styles.css'){
        res.writeHead(200,{'content-type':'text/css'})
        res.write(styles)
        res.end()
    }
    else if(req.url==='/logo.svg'){
        res.writeHead(200, { 'content-type': 'image/svg+xml' })
        res.write(logo)
        res.end()
    }
    else if(req.url==='/browser-app.js'){
        res.writeHead(200, { 'content-type': 'text/javascript' })
        res.write(logic)
        res.end()
    }

    else{
        res.end('No NO ')
    }
})
server.listen(5000)