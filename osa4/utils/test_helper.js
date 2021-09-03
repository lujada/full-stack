const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
    {
        username: 'Sakke',
        name: 'Sakari',
        password: 'asd123'
    },
    {
        username: 'Spede',
        name: 'Spede Pasanen',
        password: '123666'
    }
]
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}