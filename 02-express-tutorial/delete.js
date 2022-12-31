const express = require('express')
const app = express()
const port = 5000
let {people} = require('./data')

app.use(express.static('./methods-public'))


app.use(express.json())




app.delete('/api/people/:id', (req, res)=>{


    const person = people.find((guys)=>guys.id == Number(req.params.id))

    if(!person){
        return res.status(404).json({success:false, msg: `No person has been found with id:${req.params.id}`})
    }

    const newperson = people.filter((person)=> person.id !== Number(req.params.id))


     res.status(200).json({success:true, data:newperson})
})






app.all('*', (req, res)=>{
    res.status(404).send('This page cannot be found.')
})




app.listen({port}, ()=>{
    console.log(`server is running on port, ${port}`)
})