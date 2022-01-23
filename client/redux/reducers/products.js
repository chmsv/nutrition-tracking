// Reducer for retrieving data from server
const GET_PRODUCT = '@products/GET_PRODUCT'
const UPDATE_PRODUCTLIST = '@products/UPDATE_PRODUCTLIST'

const initialState = {
  product: {},
  productsList: []
}

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT: {
      return {
        ...state,
        product: action.payload
      }
    }
    default:
      return state
  }
}

/* export function getProduct() {
  return (dispatch, getState) => {
    const store = getState()
    const { inputText } = store.common
    fetch(`/api/v1/${inputText}`)
      .then((res) => res.json())
      .then((result) => {
        dispatch({
          type: GET_PRODUCT,
          payload: result
        })
      })
      .catch((error) => console.log(error))
  }
} */

export function getProduct() {
  return (dispatch, getState) => {
    const store = getState()
    const { inputText } = store.common
    const { productsList } = store.products
    fetch(`/api/v1/${inputText}`)
      .then((res) => res.json())
      .then((result) => {
        dispatch({
          type: GET_PRODUCT,
          payload: result
        })

        if (result.status === 'success') {
          dispatch({
            type: UPDATE_PRODUCTLIST,
            payload: [...productsList, result.data]
          })
        }
      })
      .catch((error) => {
        return error
      })
  }
}
