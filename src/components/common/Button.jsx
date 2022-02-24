import clsx from 'clsx'
import PropTypes from 'prop-types'
import { memo } from 'react'

function Button({
  onClick,
  children,
  className,
  type,
  disabled,
  block
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
        disabled && 'cursor-not-allowed opacity-50',
        block && 'w-full',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  block: PropTypes.bool
}

Button.defaultProps = {
  onClick: undefined,
  children: null,
  className: '',
  type: 'button',
  disabled: false,
  block: false
}

export default memo(Button)
