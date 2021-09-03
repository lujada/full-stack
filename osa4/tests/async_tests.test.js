const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

jest.setTimeout(50000)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


describe('tests with async', () => {
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
    .expect(200)

    const blogsAfterPost = await helper.blogsInDb()

    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length +1)

    const titles = blogsAfterPost.map(blog => blog.title)
    expect(titles).toContain('testBlog')
})

test('change no likes to 0', async () => {
    const newBlog = {
        title: 'testBlog',
        author: 'Blog Writer',
        url: 'www.testingblog.com',
        likes: null
        }
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)

        const blogsAfterPost = await helper.blogsInDb()

        expect(blogsAfterPost[2].likes).toBe(0)
    
})

test('do not add blog without title', async () => {
    const newBlog = {
        title: null,
        author: 'Blog Writer',
        url: 'www.testingblog.com',
        likes: 5
        }
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

        const blogsAfterPost = await helper.blogsInDb()

        expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)

})

test('Do not add blog without url', async () => {
    const newBlog = {
        title: 'Blogging title',
        author: 'Blog Writer',
        url: null,
        likes: 5
        }
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAfterPost = await helper.blogsInDb()
    
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)
    
})

test('Do not add blog without title or url', async () => {
    const newBlog = {
        title: null,
        author: 'Blog Writer',
        url: null,
        likes: 5
        }
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

        
        const blogsAfterPost = await helper.blogsInDb()
    
        expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length)
    
})
})
describe('delete note', () => {
    test('deleting an existing blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length -1)

    const contents = blogsAtEnd.map(blogs => blogs.title)

    expect(contents).not.toContain(blogToDelete.title)
    })

test('test updating a note', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = 5

    await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd[0].likes

    expect(likes).toBe(5)

})
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
       // await User.insertMany(helper.initialUsers)
            
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({
            username: 'root', passwordHash
        }) 
    
        await user.save()
    })
    
    test('creation succeeds with a new username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'Spede',
            name: 'Spede Pasanen',
            password: 'salis'
        }
    
    await api.post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length +1)
    
            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)
    })

    test('creation fails if password is too short', async () => {
        const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'Tynkä_salasana',
        name: 'Pätkä',
        password: 'ab'
    }
    await api.post('/api/users')
    .send(newUser)
    .expect(400)

    usersAtEnd = await helper.usersInDb()

    expect(usersAtStart).toHaveLength(usersAtEnd.length)

    })

    test('creation fails if username already exists', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Illegal username',
            password: 'whatever'
        }

        await api.post('/api/users')
        .send(newUser)
        .expect(400)

        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
mongoose.connection.close()
})

