import { useDispatch, useSelector } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      if ( state.filter === 'ALL' ) { 
      return (state.anecdotes).sort(function(first, second) {
         return second.votes - first.votes})
}    return (state.anecdotes.filter((item) => item.content.toLowerCase().includes(state.filter)).sort(function(first, second) {
  return second.votes - first.votes}))
})
  

    return (
        <>
      {anecdotes.map((anecdote) =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(likeAnecdote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
        </>
    )
}


export default AnecdoteList
