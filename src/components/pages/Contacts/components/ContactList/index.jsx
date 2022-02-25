import ContactListItem from './ContactListItem'
import Button from '../../../../common/Button'
import { useContacts } from '../../context/ContactContext'

export default function ContactList() {
  const { contactList, handleSortContact } = useContacts()

  return (
    <section className="p-4 mx-auto container py-8">
      <h1 className="text-2xl font-bold mb-3 ">Contact List</h1>
      <ul className="space-y-4 grid grid-cols-3 gap-4 items-center lg:justify-between justify-center">
        {contactList.map(contact => (
          <ContactListItem key={contact.id} item={contact} />
        ))}
      </ul>
      <Button block className="mr-2" type="button" onClick={handleSortContact}>Sort</Button>
    </section>
  )
}
