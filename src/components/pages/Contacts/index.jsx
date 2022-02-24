import { ContactContextProvider } from './context/ContactContext'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

export default function Contacts() {
  console.log('Estas aquí')
  return (
    <div className="flex">
      <ContactContextProvider>
        <ContactForm />
        <ContactList />
      </ContactContextProvider>
    </div>

  )
}
