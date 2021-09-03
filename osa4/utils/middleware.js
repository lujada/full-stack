const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    if (error.name === 'Password too short') {
        return response.status(400).json({error: error.message})
    }
    next(error)
}

module.exports = {
    errorHandler
}