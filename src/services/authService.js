import axios from 'axios'
import { API_URL } from '../config/constants'

const client = axios.create({ baseURL: `${API_URL}/auth` })

export default function getAuthService() {
  const login = async credentials => {
    const response = await client.post('/login', credentials)
    return response.data.token
  }

  const signup = async user => (
    client.post('/signup', user)
  )

  return { login, signup }
}
