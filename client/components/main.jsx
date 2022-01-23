import React from 'react'
import { useSelector } from 'react-redux'

import Head from './head'
import Input from './common/input'
import Button from './common/button'
import Table from './common/table'
import Header from './common/header'

const Main = () => {
  const { productsList } = useSelector((store) => store.product)
  return (
    <>
      <Head title="Main" />
      <Header />
      <Button name="Add Product" />
      <Input />
      <Table list={productsList} />
    </>
  )
}

export default Main
