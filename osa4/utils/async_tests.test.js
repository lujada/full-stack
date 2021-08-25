const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

jest.setTimeout(50000)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('get all blogs', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})

test('return id', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body
    expect(contents[0].id).toBeDefined()
    expect(contents[1].id).toBeDefined()
})

test('post new blog', async () => {
    const newBlog = {
    title: 'testBlog',
    author: 'Blog Writer',
    url: 'www.testingblog.com',
    likes: 10
    }
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)

    const blogsAfterPost = await helper.blogsInDb()

    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length +1)

    const titles = blogsAfterPost.map(blog => blog.title)
    expect(titles).toContain('testBlog')
})

afterAll(() =>
mongoose.connection.close)
