const express = require('express')

const ProductsService = require('../services/products.services')
const validatorHandler = require('../middlewares/validator.handler')
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema
} = require('../schemas/product.schema')

const router = express.Router()
const service = new ProductsService()

router.get('/', async (req, res) => {
  const products = await service.find()

  res.json(products)
})

// para que /filter lo tome como endpoint específico y no como
// un param dinámico (:id), sólo hay que definir
// la ruta específica encima de la dinámica
router.get('/filter', (req, res) => {
  res.send('yo soy un filter')
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body
    const newProduct = await service.create(body)
    res.status(201).json({
      message: "created",
      data: newProduct
    })
  }
)

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body

      const modifiedProduct = await service.update(id, body)

      res.json({
        message: "update",
        data: modifiedProduct,
      })
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const rta = await service.delete(id)

  res.json(rta)
})

module.exports = router
