import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { useDispatch } from 'react-redux'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addLike(state, action) {
    const id = action.payload
    const voteToChange = state.find(n => n.id === id)
    const changedVote = {
      ...voteToChange,
      votes: voteToChange.votes + 1
    }
    return state.map(item =>
      item.id !== id ? item : changedVote
    )
  },
    appendAnecdote(state, action){
    state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
  }
  }
})
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
  const newAnecdote = await anecdoteService.createNew(content)
  dispatch(appendAnecdote(newAnecdote))
  }
}

export const likeAnecdote = content => {
  return async dispatch => {
    await anecdoteService.addVote(content)
    dispatch(addLike(content))
  }
}



export const { addLike, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer