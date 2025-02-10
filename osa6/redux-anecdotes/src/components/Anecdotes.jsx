import { useDispatch, useSelector } from 'react-redux'
import reducer from '../reducers/anecdoteReducer'
import { likeAnecdote } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state).sort(function(first, second) {
      return second.votes - first.votes
    })

    return (
        <>
        <h2>Anecdotes</h2>
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

export default Anecdotes
