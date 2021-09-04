const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    
    if (body.password.length < 3) {
        return response.status(400).json({error: 'Password too short'})
    }
    
    else {
        const savedUser = await user.save()
    response.json(savedUser)
    }
})

module.exports = usersRouter