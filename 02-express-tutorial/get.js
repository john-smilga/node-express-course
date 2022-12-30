const express = require('express')
const app = express()
const port = 5000
let {people} = require('./data')

// app.use(express.static('./methods-public'))



app.get('/api/people', (req,res)=>{

    // const guys = people.map((person)=>{
    //     const {id, name} = person
    //     return {id, name}
    // })

    // res.send(guys)


    res.status(200).json({success:true, data:people})
})













app.all('*', (req, res)=>{
    res.status(404).send('This page cannot be found.')
})




app.listen({port}, ()=>{
    console.log(`server is running on port, ${port}`)
})