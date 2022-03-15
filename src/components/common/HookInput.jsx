/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types'

export default function HookInput({
  name,
  label,
  register,
  placeholder,
  className,
  errorMessage,
  type
}) {
  return (
    <div className={className}>
      {label && (
        <label
          className="block text-sm font-medium leading-5 text-gray-50"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        className="rounded shadow appearance-none border-gray-500 block py-1 px-2 w-full"
        placeholder={placeholder}
        type={type}
        {...register(name)}
      />
      {errorMessage && <small className="text-xs text-red-500">{errorMessage}</small>}
    </div>
  )
}

HookInput.propTypes = {
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string
}

HookInput.defaultProps = {
  placeholder: '',
  className: '',
  errorMessage: '',
  type: 'text',
  label: ''
}
