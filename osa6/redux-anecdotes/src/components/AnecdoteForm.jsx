import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, emptyNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) =>{
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        setTimeout(() => {
            dispatch(emptyNotification())
          }, 5000)
          dispatch(addNotification(`added ${content}`))
    }
    return (
        <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">add</button>
        </form>
        </>
    )

}

export default AnecdoteForm