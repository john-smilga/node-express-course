const express = require('express')
const app = express()
const morgan = require('morgan')
const logger = require('./logger')
const authorize = require('./authorize')
const { product } = require('./data #made product definition
const { people } = require('./data') #made people definition
//  req => middleware => res

// app.use([logger, authorize])
// app.use(express.static('./public'))
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('Home')
})
app.get('/about', (req, res) => {
  res.send('About')
})
#get product api
app.get('/api/products', (req, res) => {
  const newProducts = product.map((items)=>{
    const {id, name, image} = items;
    return {id, name, image}
  })
  res.json(newProducts)
})
#get people api
app.get('/api/people', (req,res)=>{
  const newPeople = people.map((items)=>{
    const {id, name } = items;
    return {id, name}
  })
  console.log(newPeople)
  res.json(newPeople)
})

app.get('/api/items', (req, res) => {
  console.log(req.user)
  res.send(''You insert john name'')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
