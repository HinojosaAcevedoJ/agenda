import * as yup from 'yup'

export default yup.object({
  firstName: yup.string().min(3, 'Too short').required(),
  lastName: yup.string().min(3, 'Too short').required(),
  age: yup.number().positive().integer().required(),
  phone: yup.string().min(9).max(12).required(),
  email: yup.string().email().required(),
  image: yup.string().url().required()
}).required()
