import PropTypes from 'prop-types'
import clsx from 'clsx'
import contactItemPropType from './contactItemPropType'
import Button from '../../../../common/Button'
import { useContacts } from '../../context/ContactContext'

export default function ContactListItem({ item }) {
  const { handleRemoveContact, handleSelectContactForUpdate, updatingContact } = useContacts()

  const handleSelect = () => {
    handleSelectContactForUpdate(item)
  }

  const handleContactRemoveById = () => {
    handleRemoveContact(item.id)
  }

  return (
    <li className={clsx('shadow rounded p-2 flex hover:bg-indigo-500', updatingContact.id === item.id && 'bg-blue-500')}>
      <div className="mr-4">
        <img src={item.image} alt={item.firstName} className="rounded h-40 w-40 object-cover" />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-lg font-bold mb-3">{`${item.firstName} ${item.lastName}`}</h3>
        <p className="text-base opacity-75 mb-2">{item.age} años</p>
        <p className="text-base">{item.email}</p>
        <p className="text-base">{item.phone}</p>
      </div>
      <div className="flex flex-col justify-end">
        <Button type="button" className="bg-red-600" onClick={handleContactRemoveById}>Delete</Button>
        <br />
        <Button type="button" onClick={handleSelect}>Edit</Button>
      </div>
    </li>
  )
}

ContactListItem.propTypes = {
  item: PropTypes.shape(contactItemPropType).isRequired
}
