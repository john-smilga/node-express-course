const express = require('express')
const app = express()
let { people } = require('./data')


app.use(express.static('./methods-public'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/login', (req,res)=>{
    //console.log(req.body)
    const {name} = req.body;
    if(name) {
        return res.status(200).send(`Welcome ${name}`)
    }
    res.status(401).send('Please return credentials and fill it with word')
})

app.get('/api/people', (req,res) =>{
    res.status(200).json({success:true, data:people})
})

app.post('/api/people', (req,res) =>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false, msg:'please provide name value'})
    }
    res.status(201).send({success:true, person:name})
    console.log(name)
})

app.post('/api/people/postman', (req,res)=>{
    const {name} = req.body
    const {id} = req.body
    if(!name){
        return res.status(400).json({success:false, msg:'please provide name value'})
    }
    res.status(201).send({success:true, data: [...people, name, id], msg:`You add new name to our datalist : ${name} `})
})

app.put('/api/people/:id', (req,res)=>{
    const {id} = req.params
    const {name} = req.body

    const person = people.find((person)=>person.id === Number(id))
    if(!person){
        return res.status(404).json({success:false, msg:`No person with id ${id}`})
    }
    const newPeople = people.map((person)=>{
        if(person.id === Number(id)){
            person.name = name
        }
        return person
    })
    res.status(200).json({ success:true, data:newPeople })
    console.log(id, name);
})

//search for existed name
app.put('/api/people', (req,res)=>{
    const {name} = req.body
    
    const person = people.find((person)=>person.name === name)
    if(!person){
        return res.status(404).json({success:false, msg:`No person with name ${name} in our data. Fill Name again`})
    }
    res.status(200).json({ success:true, data:name, msg:'Name matched'})
    console.log(name);
})

app.delete('/api/people/:id', (req,res)=>{
    const person = people.find((person)=>person.id === Number(req.params.id))

    if(!person){
        return res.status(404).json({success:false, msg: `No person with id ${req.params.id}`})
    }
    const newPeople = people.filter((person)=>person.id !== Number(req.params.id));
    return res.status(200).json({success:true, data:newPeople, msg: `Data with id ${req.params.id} deleted`}) //add message for deleted data
})

app.listen(5000, () =>{
    console.log('Server is listening on port 5000 .....')
})
