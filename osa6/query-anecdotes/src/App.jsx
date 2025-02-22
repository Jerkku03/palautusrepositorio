import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './notifiactionContext'


const App = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const { isError, isPending, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  if (isError) {
    return <span>anecdote service not available</span>
  }

  if ( isPending ) {
    return <div>loading data...</div>
  }

  console.log(data)
  const anecdotes = data
  

  const handleVote = (anecdote) => {
    const id = anecdote.id
    const voteToChange = anecdotes.find(n => n.id === id)
    const changedVote = {
      ...voteToChange,
      votes: voteToChange.votes + 1
    }
    updateAnecdote(changedVote)
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

    dispatch({type: 'showNotification', payload: ` anecdote ${anecdote.content} voted`})
    setTimeout(() => {dispatch({type: 'dontShowNotification'})}, 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
