import React from 'react'

const Button = ({ name, onClick }) => {
  return (
    <button type="button" className="border rounded m-10 py-1 px-2" onClick={onClick}>
      {name}
    </button>
  )
}

export default Button
