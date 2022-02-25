import { ContactContextProvider } from './context/ContactContext'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

export default function Contacts() {
  return (
    <div className="flex h-14">
      <ContactContextProvider>
        <ContactForm />
        <ContactList />
      </ContactContextProvider>
    </div>

  )
}
