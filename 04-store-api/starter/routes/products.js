<<<<<<< HEAD
const express = require('express');
const router = express.Router();  

const {getAllProductsStatic,getAllProducts}=require('../controllers/products')
=======
const express = require('express')
const router = express.Router()

const {
  getAllProducts,
  getAllProductsStatic,
} = require('../controllers/products')
>>>>>>> 903c21e04f1f41b763ed6ae3f3235ce0a2b9a628

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)

<<<<<<< HEAD

module.exports=router
=======
module.exports = router
>>>>>>> 903c21e04f1f41b763ed6ae3f3235ce0a2b9a628
