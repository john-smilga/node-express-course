const express = require('express')
const app = express()
const port = 5000


app.get('/', (req, res)=>{
    res.status(200).send('Hello Friend!')
})

app.get('/about', (req, res)=>{
    res.status(200).send('About me!')
})

app.all('*', (req, res)=>{
    res.status(404).send(`<h2> The page was not found!`)
})

app.listen({port}, ()=>{
    console.log(`server is listening on ${port}`)
})