import { render, screen } from '@testing-library/react'
import CreateNew from './CreateNew'
import userEvent from '@testing-library/user-event'
import { expect, vi} from 'vitest'

test('luo blogi, takaisinkutsu', async () => {
  const blogServiceMock = vi.fn()

    render(<CreateNew blogService={blogServiceMock}/>)

    screen.debug()

})