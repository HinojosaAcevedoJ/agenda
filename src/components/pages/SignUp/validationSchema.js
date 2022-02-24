import * as yup from 'yup'

export default yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
}).required()
