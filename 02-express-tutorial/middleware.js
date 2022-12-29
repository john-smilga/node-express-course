const express = require('express')
const app = express()
const port = 5000
const logger = require('./logger')
const authorize = require('./authorize')


app.use( [logger, authorize] )



app.get('/',   (req, res)=>{
    res.send('Home')
})


app.get('/about', (req, res)=>{
    res.send('About')
})





app.all('*', (req, res)=>{
    res.status(404).send(`<h2> Cannot seem to find the page you are looking for </h2>`)
})

app.listen({port}, ()=>{
    console.log(`Server is lsitening on port, ${port}`)
})

