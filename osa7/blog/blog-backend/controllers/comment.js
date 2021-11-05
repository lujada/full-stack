const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentRouter.get('/', async (request, response, next) => {
    const comments = await Comment.find({}).populate('blog', {title: 1, id: 1})
    response.json(comments.map(comment => comment.toJSON()))
})

commentRouter.post('/', async (request, response, next) => {
    console.log(request, 'body')
    const comment = new Comment(request.body)
    console.log(comment, 'comment')

    const savedComment = await comment.save()
    const blog = await Blog.findById(request.body.blog)

    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()


    response.status(201).json(savedComment)
})

module.exports = commentRouter