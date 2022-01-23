import React from 'react'

const Button = ({ name, onClick }) => {
  return (
    <button
      type="button"
      className="border rounded m-1 p-2"
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default Button
