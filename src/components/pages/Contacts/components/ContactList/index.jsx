import ContactListItem from './ContactListItem'
import Button from '../../../../common/Button'
import { useContacts } from '../../context/ContactContext'

export default function ContactList() {
  const { contactList, handleSortContact } = useContacts()

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-3">Contact List</h1>
      <ul className="space-y-4">
        {contactList.map(contact => (
          <ContactListItem key={contact.id} item={contact} />
        ))}
        <Button block className="mr-2" type="button" onClick={handleSortContact}>Sort</Button>
      </ul>
    </section>
  )
}
