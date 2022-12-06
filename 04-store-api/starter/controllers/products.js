const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  // throw new Error('error from products route')
  const search = 'al'
  const products = await Product.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price')
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  // throw new Error('error from products route')
  const { featured, company, name, sort, fields, numericFilters } = req.query
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }

  console.log(queryObject)
  let result = Product.find(queryObject)
  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }
  // select fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }
  // pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  //23 products
  //4 7 7 7 2
  if (req.query.page) {
    const numProducts = await Product.countDocuments()
    if (skip >= numProducts) {
      throw new Error('This page does not exist')
    } else {
      result = result.skip(skip).limit(limit)
    }
  }

  const products = await result
  console.log(req.query)
  res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
}
