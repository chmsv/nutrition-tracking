// Reducer for controlled input
const INPUT_TEXT = '@common/INPUT_TEXT'
const SET_PRODUCT_WEIGHT = '@common/SET_PRODUCT_WEIGHT'

const initialState = {
  inputText: '',
  productWeight: 0
}

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INPUT_TEXT: {
      return {
        ...state,
        inputText: action.payload
      }
    }
    case SET_PRODUCT_WEIGHT: {
      return {
        ...state,
        productWeight: action.payload
      }
    }
    default:
      return state
  }
}

export function setInputValue(value) {
  return {
    type: INPUT_TEXT,
    payload: value
  }
}

export function setWeight(value) {
  return {
    type: SET_PRODUCT_WEIGHT,
    payload: value
  }
}
