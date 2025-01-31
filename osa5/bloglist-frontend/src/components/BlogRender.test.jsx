import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renderöi titlen', () => {
  const blog = {
    id: '123',
    title: 'Component testing is done with react-testing-library',
    author: 'tunt',
    url: '123',
    likes: 0,
    user: {
      username: 'tunt',
      password: '123'
    },
    important: true
  }

  const user = {
    username: 'tunt',
    password:'123'
  }

  render(<Blog blog={blog} user={user}/>)
  
  screen.getByText('Component testing is done with react-testing-library')
  
})