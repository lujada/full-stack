import axios from 'axios'
const baseUrl = '/api/comments'

const create = async (content) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

export default { create: create }