import React from 'react'

const Button = ({ name, onClick }) => {
  return (
    <button type="button" className="border rounded-lg my-10 mx-4 py-1 px-2 bg-green-600 text-green-100 font-semibold hover:bg-green-400 hover:text-green-800" onClick={onClick}>
      {name}
    </button>
  )
}

export default Button
