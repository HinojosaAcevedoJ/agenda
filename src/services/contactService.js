import axios from 'axios'
import { API_URL } from '../config/constants'

const getClient = token => (
  axios.create({
    baseURL: `${API_URL}/persons`,
    headers: { Authorization: token ? `Bearer ${token}` : undefined }
  })
)

export default function getContactService({ token }) {
  const client = getClient(token)

  const getAll = async () => {
    const response = await client.get('/')
    return response.data
  }

  const update = async (payload, id) => {
    const response = await client.put(`/${id}`, payload)
    return response.data
  }

  const create = async payload => {
    const response = await client.post('/', payload)
    return response.data
  }

  const remove = async id => {
    const response = await client.delete(`/${id}`)
    return response.data
  }

  return {
    getAll,
    update,
    create,
    remove
  }
}
