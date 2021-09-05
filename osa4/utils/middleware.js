const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const token = authorization.substring(7)
      request.token = token
    }
    next()
  }

const userExtractor = (request, response, next) => {
    const userAuthorization = request.body.userId
    console.log(userAuthorization, 'user in middleware')

    if (userAuthorization) {
        request.user = userAuthorization
        console.log(request.user, "user request")
    }
    next()
}


const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    else if (error.name === 'Password too short') {
        return response.status(400).json({error: error.message})
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }

    console.log(error.message)
    next(error)
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}