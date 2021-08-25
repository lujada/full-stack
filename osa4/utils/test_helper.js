const Blog = require('../models/blog')

const initialBlogs = [
    {
    title: 'initialblog',
    author: 'Initial Author',
    url: 'www.testingblog1.com',
    likes: 10
    },
    {
     title: 'Secondblog',
    author: 'Second Author',
    url: 'www.testingblog2.com',
    likes: 15
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}