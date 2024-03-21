const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express()

const port = process.env.PORT || 3000

// ¿Cuál es el middleware de express que me permite recibir la información de POST en formato JSON?
app.use(express.json())

const whitelist = ['http://localhost:8080', 'https://garavito.dev']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    }
    callback(new Error('no permitido'))
  }
}
app.use(cors(options))

app.get('/api', (req, res) => {
  res.send('Hola mi server en express')
})

app.get('/api/nueva-ruta', (req, res) => {
  res.send('Hola, soy un nuevo endopoint')
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Mi port: ' + port)
})

module.exports = app
