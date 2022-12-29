const express = require('express')
const app = express()
const port = 5000
const {products, people} = require('./data')


app.get('/', (req, res)=>{

    res.status(200).send(`<h2> This is the home page </h2> <a href = '/api/products'> Products </a>`)


})


// app.get('/api/products', (req, res)=>{

//     const newproduct = products.map((product) =>{
//         const {id, name, image, price } = product
//         return{id, name, image, price}
//     })
//     res.json(newproduct)


// })


// app.get('/api/products/1', (req, res)=>{

//    const singleproduct = products.find(product => product.id === 1)

//    res.json(singleproduct)

// })


// app.get('/api/products/:productID', (req, res)=>{

//     const {productID} = req.params
//     const singleproduct = products.find(product => product.id === Number(productID));


//     if (!singleproduct){
//         return res.status(404).send(`<h2> The product is not Available </h2> <a href ='/'> Home </a>`)
//     }

//     return res.json(singleproduct) 
// })


app.get('/api/products', (req, res)=>{

    const manyproducts = products.map((product)=>{
        const {id, name, image, price} = product
        return {id, name, image, price}
    })

    res.json(manyproducts)
})


app.get('/api/products/:id', (req, res)=>{

    const {id} = req.params
    const singleproduct = products.find(product => product.id === Number(id))

    if (!singleproduct){

       return  res.status(404).send(`<h2> The product cannot seem to be found </h2> <a href = '/'> Go back Home </a>`)
        
    }

    return res.json(singleproduct)
})




 app.all('*', (req, res) => {

    res.send(`<h2> Error Page! </h2> <a href = '/'> Go back Home </a>`)
 })






app.listen({port}, ()=>{
    console.log(`server is running on port, ${port}`)
})