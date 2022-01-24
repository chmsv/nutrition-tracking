import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { getProduct } from '../../redux/reducers/products'
import { setWeight } from '../../redux/reducers/common'

import Input from './input'
import Button from './button'

const InputPanel = () => {
  const [productName, setProductName] = useState('')
  const [productWeight, setProductWeight] = useState(100)
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(getProduct(productName))
    dispatch(setWeight(productWeight))
    setProductName('')
    setProductWeight(100)
  }

  return (
    <div id="input-panel" className="flex">
      <Input id="product-name" label="Product" onChange={setProductName} value={productName} submitOnKeyPress={onClick} />
      <Input id="product-weight" label="Weight (g)" type="number" onChange={setProductWeight} value={productWeight} submitOnKeyPress={onClick} />
      <Button name="Add product" onClick={onClick} />
    </div>
  )
}

export default InputPanel
