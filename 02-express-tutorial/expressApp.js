const express = require('express')
const app = express()
const port = 5000
const path = require('path')


app.use(express.static('./public'))


app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, './navbar-app/index.html'))
})


app.all('*', (req, res) => {

    res.status(404).send(`<h2>Page Cannot be located </h2>`)
})





app.listen({port}, ()=>{
    console.log(`server is listening on port ${port}`)
})

