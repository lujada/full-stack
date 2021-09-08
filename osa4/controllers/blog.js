const jwt = require('jsonwebtoken')
const {userExtractor} = require('../utils/middleware')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
  })

  blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    }
    else {response.status(404).end()}
  })
  
  blogRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    
    const user = request.user 
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
      response.json(savedBlog.toJSON())
  })

  blogRouter.delete('/:id', 
  userExtractor, async (request, response, next) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    const user = request.user
    
    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id.toString() ) {

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    }

    else return response.status(401).json({error: 'The blog does not match the user'})
  })

  blogRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.status(200).end()
  })

module.exports = blogRouter
  