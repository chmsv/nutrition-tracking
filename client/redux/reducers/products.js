// Reducer for retrieving data from server
const GET_PRODUCT = '@products/GET_PRODUCT'
const UPDATE_PRODUCTLIST = '@products/UPDATE_PRODUCTLIST'

const initialState = {
  result: {},
  productList: [],
  totalNutrients: {
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0,
    weight: 0
  }
}

function getTotalNutrients(list = []) {
  return list.reduce(
    (acc, rec) => {
      acc.calories = +(acc.calories + rec.calories * (rec.weight / 100)).toFixed(2)
      acc.protein = +(acc.protein + rec.protein * (rec.weight / 100)).toFixed(2)
      acc.fat = +(acc.fat + rec.fat * (rec.weight / 100)).toFixed(2)
      acc.carbohydrate = +(acc.carbohydrate + rec.carbohydrate * (rec.weight / 100)).toFixed(2)
      acc.weight = +(acc.weight + rec.weight).toFixed(2)
      return acc
    },
    {
      calories: 0,
      protein: 0,
      fat: 0,
      carbohydrate: 0,
      weight: 0
    }
  )
}

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT: {
      return {
        ...state,
        result: action.payload
      }
    }
    case UPDATE_PRODUCTLIST: {
      return {
        ...state,
        productList: action.payload,
        totalNutrients: getTotalNutrients(action.payload)
      }
    }
    default:
      return state
  }
}

export const getProduct = (name = '', weight = 100) => {
  return (dispatch, getState) => {
    const store = getState()
    const { productList } = store.products
    fetch(`/api/v1/${name}`)
      .then((r) => r.json())
      .then((result) => {
        if (result.status !== 'success') {
          dispatch({
            type: GET_PRODUCT,
            payload: result
          })
          throw new Error(result)
        }
        return result
      })
      .then(({ data: product }) => {
        const updatedProductList = [...productList, { ...product, weight }]
        dispatch({
          type: UPDATE_PRODUCTLIST,
          payload: updatedProductList
        })
      })
      .catch((e) => e)
  }
}
