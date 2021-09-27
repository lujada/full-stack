import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

/* eslint-disable */

describe('<Blog/> display tests', () => {

  const blog = {
    title: 'Another blog',
    author: 'Succcessful author',
    url: 'www.whatevz.com',
    likes: 1,
    user: {
      username: 'Login Tester',
      name: 'Testmaster',
      id: '6139e39d904e291fcc96b095'
    }
  }


  test('initially render only blog title and author', () => {

    const component = render(
      <Blog blog={blog} />
    )


    expect(component.container).toHaveTextContent(
      'Another blog', 'Succcessful author'
    )
    expect(component.container).not.toHaveTextContent(
      'www.whatevz.com', 1
    )

  }
  )

  test('show url and likes when button is clicked', async () => {

    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('www.whatevz.com')
    expect(component.container).toHaveTextContent('1')

  })



  test('When "like" is pressed twice, likes is +2', async () => {

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} updateBlog={mockHandler} />
    )

    const showButton = component.getByText('show')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    
})



})
