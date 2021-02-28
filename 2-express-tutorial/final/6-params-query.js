const express = require('express')
const app = express()
// products
const { products } = require('./data')
app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">products</a>')
})

app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product
    return { id, name, image }
  })
  res.status(200).json(newProducts)
})

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params
  const singleProduct = products.find((product) => product.id === Number(id))
  if (!singleProduct) {
    return res.status(404).send('Product Does Not Exist')
  }
  res.status(200).json(singleProduct)
})
app.get('/api/query', (req, res) => {
  const { search, limit } = req.query
  let sortedProducts = [...products]
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search)
    })
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send('no products matched your search')
    return res.status(200).json({ sucess: true, data: [] })
  }
  res.status(200).json(sortedProducts)
})

app.listen(5000, () => {
  console.log('server listening on port 5000...')
})
