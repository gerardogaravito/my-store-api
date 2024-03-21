const express = require('express')

const CategoriesService = require('../services/categories.services')

const router = express.Router()

const service = new CategoriesService()

// PARAMS
router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params

  const product = service.find(categoryId, productId)

  res.json(product)
})

module.exports = router
