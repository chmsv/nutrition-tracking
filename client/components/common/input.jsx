import React from 'react'

// eslint-disable-next-line object-curly-newline
const Input = ({ id, label, onChange, onKeyPress, value = '', type = 'text' }) => {
  const submitOnKeyPress = (e) => {
    if (e.code === 'Enter' || e.which === 13) {
      onKeyPress()
    }
  }
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-xs font-semibold mx-2 mt-4">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => submitOnKeyPress(e)}
        type={type}
        className="border rounded p-1 m-2"
      />
    </div>
  )
}

export default Input
