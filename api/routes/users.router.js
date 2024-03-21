const express = require('express')

const router = express.Router()

// QUERY PARAMS
// /users?limit=1&offset=100
router.get('/', (req, res) => {
  const { limit, offset } = req.query

  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('no hay parámetros')
  }
})

module.exports = router
