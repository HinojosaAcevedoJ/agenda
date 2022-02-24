import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'
import { AuthContextProvider } from './components/context/AuthContext'
import Router from './Router'

function App() {
  return (
    <>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
      <ToastContainer />
    </>
  )
}

export default App
