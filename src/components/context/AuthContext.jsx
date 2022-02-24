import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react'
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'
import getAuthService from '../../services/authService'

const TOKEN_KEY = 'agenda::token'
const storage = window.localStorage

const AuthContext = createContext({
  isAuth: false,
  login: () => {},
  logout: () => {},
  decodedToken: {},
  token: ''
})

const authService = getAuthService()

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState('')

  const login = useCallback(async payload => {
    try {
      const resToken = await authService.login(payload)
      setToken(resToken)
      storage.setItem(TOKEN_KEY, resToken)
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error(error.response.data.message)
        return
      }
      toast.error('Something was wrong!')
    }
  }, [])

  const logout = useCallback(() => {
    setToken('')
    storage.removeItem(TOKEN_KEY)
  }, [])

  const decodedToken = useMemo(() => {
    if (token) {
      console.log(token)
      return jwtDecode(token)
    }
    return {}
  }, [token])

  useEffect(() => {
    const tokenFromStorage = storage.getItem(TOKEN_KEY)
    if (tokenFromStorage) {
      setToken(tokenFromStorage)
    }
  }, [])

  const contextValue = useMemo(() => ({
    token,
    isAuth: !!token,
    decodedToken,
    login,
    logout
  }), [
    token,
    decodedToken,
    login,
    logout
  ])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useAuth = () => useContext(AuthContext)
