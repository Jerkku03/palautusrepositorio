import { useDispatch, useSelector } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
      if ( filter === 'ALL' ) { 
      return ([...anecdotes]).sort((first, second) =>
         second.votes - first.votes)
}    return ([...anecdotes].filter((item) => item.content.toLowerCase().includes(filter)).sort(function(first, second) {
  return second.votes - first.votes}))
})

    const Like = (id, content) => {
      dispatch(likeAnecdote(id))
      dispatch(setNotification(`you voted '${content}'`, 10))
    } 
  

    return (
        <>
      {anecdotes.map((anecdote) =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => Like(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
        </>
    )
}


export default AnecdoteList
