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
    <li className={clsx('shadow rounded p-2 flex justify-between hover:bg-gray-500', updatingContact.id === item.id && 'bg-blue-500')}>
      <div className="flex">
        <div className="mr-4">
          <img src={item.image} alt={item.firstName} className="rounded h-40 w-40 object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-3 text-gray-50">{`${item.firstName} ${item.lastName}`}</h3>
          <p className="text-base opacity-75 mb-2 text-gray-100">{item.age} años</p>
          <p className="text-base text-gray-100">{item.email}</p>
          <p className="text-base text-gray-100">{item.phone}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <Button type="button" className="bg-red-600" onClick={handleContactRemoveById}>Delete</Button>
        <br />
        <Button type="button" className="bg-gray-500" onClick={handleSelect}>Edit</Button>
      </div>
    </li>
  )
}

ContactListItem.propTypes = {
  item: PropTypes.shape(contactItemPropType).isRequired
}
