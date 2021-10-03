describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress Tester',
      username: 'Cyter',
      password: 'asd123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login to application')
    cy.contains('log in')
  })

  it('Login form opens when clicked', function() {
    cy.contains('log in').click()
    cy.contains('Username:')
    cy.contains('Password:')
  })


})

describe('Login', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in').click()
  })

  it('succeeds with the right credentials', function() {
    cy.get('#username').type('Cyter')
    cy.get('#password').type('asd123')
    cy.get('#login-button').click()
    cy.contains('Cyter logged in')
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('WrongUsername')
    cy.get('#password').type('aintGonnaWork')
    cy.get('#login-button').click()
    cy.get('.error').contains('Invalid username or password')
  })
})

describe('When logged in', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.contains('log in').click()
    cy.get('#username').type('Cyter')
    cy.get('#password').type('asd123')
    cy.get('#login-button').click()
    cy.contains('Cyter logged in')
  })

  it('creating a blog works', function() {
    cy.contains('Create new blog').click()
    cy.get('#title').type('Test Blog')
    cy.get('#author').type('Testing Author')
    cy.get('#url').type('www.url.com')
    cy.contains('create').click()

    cy.contains('Test Blog')
  })

  it('Liking a blog works', function() {
    cy.contains('show').click()
    cy.contains('like').click()
    cy.contains(1)
  })

  it('removing a blog works', function() {
    cy.contains('show').click()
    cy.contains('remove').click()
    cy.wait(2000)
    cy.get('html').should('not.contain', 'Test Blog')
  })


  it('make sure blogs are sorted by likes', function() {

    cy.contains('Create new blog').click()
    cy.get('#title').type('Test Blog')
    cy.get('#author').type('Testing Author')
    cy.get('#url').type('www.url.com')
    cy.contains('create').click()
    cy.contains('Test Blog')

    cy.contains('Create new blog').click()
    cy.get('#title').type('Test Blog2')
    cy.get('#author').type('Testing Author2')
    cy.get('#url').type('www.url2.com')
    cy.contains('create').click()
    cy.contains('Test Blog2')

    cy.contains('Create new blog').click()
    cy.get('#title').type('Test Blog3')
    cy.get('#author').type('Testing Author3')
    cy.get('#url').type('www.url3.com')
    cy.contains('create').click()
    cy.contains('Test Blog3')
    cy.wait(3000)

    cy.contains('show').click()
    cy.contains('like').click()
    cy.wait(2500)
    cy.contains('like').click()
    cy.wait(2500)
    cy.contains('like').click()
    cy.contains(3)

    cy.contains('show').click()
    cy.contains('Test Blog2').contains('like').click()
    cy.wait(2500)
    cy.contains('Test Blog2').contains('like').click()
    cy.wait(2500).contains(2)

    cy.contains('show').click()
    cy.contains('Test Blog3').contains('like').click()
    cy.wait(2500)

    cy.get('.blog').eq(0).contains('Test Blog')
    cy.get('.blog').eq(1).contains('Test Blog2')
    cy.get('.blog').eq(2).contains('Test Blog3')


  })


})