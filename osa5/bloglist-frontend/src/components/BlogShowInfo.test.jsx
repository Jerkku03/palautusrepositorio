import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('klikkaa view näyttää tiedot', async () => {
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
  
  const kayttaja = userEvent.setup()
  const button = screen.getByText('view')
  await kayttaja.click(button)

  screen.getByTestId('url')
  screen.getByTestId('likes')
  screen.getByTestId('author')
})