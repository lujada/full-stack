import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './blogForm'

test('<Blogform/ test>', () => {

  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Blog for Jest tester' }
  })
  fireEvent.change(author, {
    target: { value: 'Jest Jester' }
  })
  fireEvent.change(url, {
    target: { value: 'www.jesttesting.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('Blog for Jest tester')
  expect(createBlog.mock.calls[0][0].author).toBe('Jest Jester')
  expect(createBlog.mock.calls[0][0].url).toBe('www.jesttesting.com')
})