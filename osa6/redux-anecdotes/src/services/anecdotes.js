import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, id: (100000 * Math.random()).toFixed(0), votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const addVote = async (content) => {
  const id = content
  const item = await axios.get(`${baseUrl}/${id}`)
  console.log(item)
  const newItem = {...item.data, votes: item.data.votes + 1}
  const added = await axios.put(`${baseUrl}/${id}`, newItem)
}

export default { getAll, createNew, addVote }