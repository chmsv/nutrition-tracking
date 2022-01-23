import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import products from './products'
import common from './common'

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    common,
    products
  })
}

export default createRootReducer
