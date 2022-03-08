import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect
} from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { isEmpty } from 'ramda'
import { useAuth } from '../../../context/AuthContext'
import getContactService from '../../../../services/contactService'

const ContactContext = createContext({
  contactList: [],
  updatingContact: {},
  isUpdating: false,
  handleUpdateContact: () => {},
  handleCancelUpdate: () => {},
  handleSelectContactForUpdate: () => {},
  handleCreateContact: () => {},
  handleSortContact: () => {},
  handleRemoveContact: () => {}
})

export function ContactContextProvider({ children }) {
  const [contactList, setContactList] = useState([])

  const [updatingContact, setUpdatingContact] = useState({})

  const { token } = useAuth()

  const contactService = useMemo(() => getContactService({ token }), [token])

  const fetchAll = useCallback(() => {
    if (token) {
      contactService.getAll().then(data => {
        setContactList(data)
      })
    }
  }, [contactService, token])

  useEffect(() => { fetchAll() }, [fetchAll])

  const handleCreateContact = useCallback(async contact => {
    try {
      await contactService.create(contact)
      fetchAll()
      toast.success('Contacto creado correctamente!')
    } catch (error) {
      toast.error(error.response?.message || error.message)
    }
  }, [contactService, fetchAll])

  const handleSortContact = useCallback(() => {
    setContactList(prev => [
      ...prev.sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1
        }
        if (a.firstName > b.firstName) {
          return 1
        }
        return 0
      })
    ])
  }, [])

  const handleSelectContactForUpdate = useCallback(item => {
    setUpdatingContact(item)
  }, [])

  const handleCancelUpdate = useCallback(() => {
    setUpdatingContact({})
  }, [])

  const handleUpdateContact = useCallback(async values => {
    try {
      await contactService.update(values, values.id)
      setUpdatingContact({})
      fetchAll()
      toast.success('Se ha actualizado correctamente el contacto')
    } catch (error) {
      toast.error(error.response?.message || error.message)
    }
  }, [contactService, fetchAll])

  const handleRemoveContact = useCallback(async id => {
    try {
      await contactService.remove(id)
      fetchAll()
      toast.success('Se ha elimiado correctamente el contacto')
    } catch (error) {
      toast.error(error.response?.message || error.message)
    }
  }, [contactService, fetchAll])

  const contextValues = useMemo(() => ({
    contactList,
    updatingContact,
    isUpdating: !isEmpty(updatingContact),
    handleCreateContact,
    handleCancelUpdate,
    handleSelectContactForUpdate,
    handleUpdateContact,
    handleSortContact,
    handleRemoveContact
  }), [
    contactList,
    updatingContact,
    handleCreateContact,
    handleCancelUpdate,
    handleSelectContactForUpdate,
    handleUpdateContact,
    handleSortContact,
    handleRemoveContact
  ])

  return (
    <ContactContext.Provider value={contextValues}>
      {children}
    </ContactContext.Provider>
  )
}

ContactContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useContacts = () => useContext(ContactContext)
