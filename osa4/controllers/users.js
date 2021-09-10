const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1,  likes: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const { password, name, username } = request.body
  
    if ( !password || password.length<3 ) {
      return response.status(400).send({
        error: 'password must be at least 3 characters'
      })
    }
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username, 
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.json(savedUser)
  })

module.exports = usersRouter