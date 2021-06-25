const express=require('express')
const app = express();
const path = require('path');
const {products}=require('./data')
app.use(express.static('./public'));
app.get('/',(req,res)=>{
    res.json(products)
})
app.get('/about',(req,res)=>{
    const newProducts = products.map((product)=>{
        const {id,name,image } = product
        return{id,name,image}
    })
    res.json(newProducts)
})
app.get('/singleProduct/1',(req,res)=>{
    const singleProduct = products.find((products)=>products.id===1)
    res.json(singleProduct)
})
app.get('/new/ok',(req,res)=>{
    console.log(req.query)
    const {productID} = req.query

    let sortedProducts=[...products]
    if(productID){
        sortedProducts=sortedProducts.filter((product)=>{
            return product.name.startsWith(productID)
        })
    }


    res.send('<h1>Ok </h1>')
})

app.listen(5000)