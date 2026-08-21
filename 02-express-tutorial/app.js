const http = require('http');
const {readFileSync}= require('fs');
//get all files
const homepage = readFileSync('./index.html');
const server = http.createServer((req,res)=>{
    const url = req.url;
//home page
    if(url === '/'){
    console.log(req.url)
    res.writeHead(200,{'content-type':'text/html'})
    res.write(homepage);
    res.end();
//about page
} else if(url === '/about') {
    res.writeHead(200,{'content-type':'text/html'})
    res.write('<h1>About Page </h1>');
    res.end();
//404
} else {
    res.writeHead(404,{'content-type':'text/html'})
    res.write('<h1>404 page Not Found</h1>');
    res.end();
}
})
    
    

server.listen(5000)
