const express = require('express')
const app = express()
const port = 5000
let {people} = require('./data')

app.use(express.static('./methods-public'))


app.use(express.json())


app.post('/api/people', (req, res)=>{

    const { name }= req.body
    if (!name){
        return res.status(400).json({success:false, msg: 'Provide your name!'})
    }


    return res.status(201).json({success: true, person: name})



})


app.get('/api/people', (req,res)=>{
 

    res.status(200).json({success:true, data:people})
})


app.put('/api/people/:id', (req, res)=>{

     const {id} = req.params
     const {name} = req.body
    //  console.log(id, name)
    //  res.send('Hey')

    const person = people.find((guys)=>guys.id == Number(id))

    if(!person){
        return res.status(404).json({success:false, msg: `No person has been found with id:${id}`})
    }


    const newperson = people.map((perso)=>{

        if(perso.id==Number(id)){
            perso.name= name
        }

        return perso
    })

    res.status(200).json({success:true, data:newperson})
     


})






app.all('*', (req, res)=>{
    res.status(404).send('This page cannot be found.')
})




app.listen({port}, ()=>{
    console.log(`server is running on port, ${port}`)
})