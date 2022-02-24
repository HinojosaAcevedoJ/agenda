import axios from 'axios'

const client = axios.create({ baseURL: 'http://localhost:4000/auth' })

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
