import React from 'react'
import { useSelector } from 'react-redux'

import Head from './head'
import Header from './header'
import InputPanel from './common/inputPanel'
import Table from './common/table'

const Main = () => {
  const { productList } = useSelector((store) => store.products)
  return (
    <>
      <Head title="Main" />
      <Header />
      <InputPanel />
      <Table list={productList} />
    </>
  )
}

export default Main
