const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
  })

  blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(note.toJSON())
    }
    else {response.status(404).end()}
  })
  
  blogRouter.post('/', async (request, response) => {
    const body = request.body
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })

    const savedBlog = await blog.save()
      response.json(savedBlog.toJSON())
  })

  blogRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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
  