let { people } = require('../data')


const getPeople = (req,res) =>{
    res.status(200).json({success:true, data:people})
}

const createPerson = (req,res) =>{
    const {name} = req.body
    if(!name){
        return res.status(400).json({success:false, msg:'please provide name value'})
    }
    res.status(201).send({success:true, person:name})
    console.log(name)
}

const createPersonPostman = (req,res)=>{
    const {name} = req.body
    const {id} = req.body
    if(!name){
        return res.status(400).json({success:false, msg:'please provide name value'})
    }
    res.status(201).send({success:true, data: [...people, name, id], msg:`You add new name to our datalist : ${name} `})
}

const findPersonId = (req,res)=>{
    const {name} = req.body
    
    const person = people.find((person)=>person.name === name)
    if(!person){
        return res.status(404).json({success:false, msg:`No person with name ${name} in our data. Fill Name again`})
    }
    res.status(200).json({ success:true, data:name, msg:'Name matched'})
    console.log(name);
}

const updatePerson = (req,res)=>{
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
}

const deletePerson = (req,res)=>{
    const person = people.find((person)=>person.id === Number(req.params.id))

    if(!person){
        return res.status(404).json({success:false, msg: `No person with id ${req.params.id}`})
    }
    const newPeople = people.filter((person)=>person.id !== Number(req.params.id));
    return res.status(200).json({success:true, data:newPeople, msg: `Data with id ${req.params.id} deleted`}) //add message for deleted data
}

module.exports = {
    getPeople, 
    createPerson, 
    createPersonPostman, 
    findPersonId,
    updatePerson,
    deletePerson
}
