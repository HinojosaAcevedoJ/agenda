import { ContactContextProvider } from './context/ContactContext'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import Button from '../../common/Button'
import { useAuth } from '../../context/AuthContext'

export default function Contacts() {
  const { logout } = useAuth()
  return (
    <section className="bg-indigo-600">
      <div className="grid grid-cols-2">
        <h1 className="text-2xl font-bold mb-3 flex justify-center">Agenda</h1>
        <Button block className="mr-2 h-10 w-20" type="button" onClick={logout}>logout</Button>
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
