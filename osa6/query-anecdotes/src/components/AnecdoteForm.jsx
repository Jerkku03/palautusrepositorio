import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../notifiactionContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5){
      dispatch({type: 'showNotification', payload: 'pitää sisältää yli 5 merkkiä'})
      setTimeout(() => {dispatch({type: 'dontShowNotification'})}, 5000)
      return
    } 
    dispatch({type: 'showNotification', payload: `${content} added`})
    setTimeout(() => {dispatch({type: 'dontShowNotification'})}, 5000)
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({content, id: (100000 * Math.random()).toFixed(0), votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
