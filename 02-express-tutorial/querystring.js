const express = require('express')
const app = express()
const port = 5000
const {products, people} = require('./data')



app.get('/api/v1/query', (req, res) => {

    // console.log(req.query)
    // res.send('Home page')

    const {search, limit} = req.query
    let sortedproducts = [...products]

   if (search) {

    sortedproducts = sortedproducts.filter((product)=>{
        return product.name.startsWith(search)
    })
   }

   if (limit) {
    sortedproducts = sortedproducts.slice(0, Number(limit))
   }

   res.status(200).json(sortedproducts)
})






app.all('*', (req, res)=>{
    res.send(`<h2> Cannot seem to locate this page</h2>`)
})


app.listen({port}, ()=>{
    console.log(`server is running on port, ${port}`)
})