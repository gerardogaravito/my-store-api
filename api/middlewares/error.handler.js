function logErrors(err, req, res, next) {
  console.error(err)
  next(err)
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

// Cannot set headers after they are sent to the client
// este error suele aparecer cuando el next() no se coloca dentro de else{}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
