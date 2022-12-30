const express = require('express')
const app = express()
const port = 5000
let {people} = require('./data')

app.use(express.static('./methods-public'))

app.use(express.urlencoded({ extended:false }))


app.post('/login', (req, res)=>{

    // console.log(req.body)

    const {name} = req.body

    if(name){

        return res.status(200).send(`<h2> Hello and Welcome, ${name}! </h2>`)

    }

    res.status(401).send(`<h2> Please Provide Your Name!`)




})





app.all('*', (req, res)=>{
    res.status(404).send('This page cannot be found.')
})




app.listen({port}, ()=>{
    console.log(`server is running on port, ${port}`)
})