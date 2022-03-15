import { ContactContextProvider } from './context/ContactContext'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import Button from '../../common/Button'
import { useAuth } from '../../context/AuthContext'

export default function Contacts() {
  const { logout } = useAuth()
  return (
    <section className="bg-gray-900">
      <div className="grid grid-cols-2">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold mb-3 text-gray-50">Agenda</h1>
        </div>
        <div className="flex justify-end">
          <Button block className="mr-2 h-10 w-20" type="button" onClick={logout}>logout</Button>
        </div>
      </div>
      <div className="flex">
        <ContactContextProvider>
          <ContactForm />
          <ContactList />
        </ContactContextProvider>
      </div>
    </section>
  )
}
