import { handleActions } from 'redux-actions'
import actions from '../actions/user'

const initialState = { 
  uid: null,
  properties: {
    avatar: null,
    name: null,
  },
}

const reducer = handleActions({
  [actions.setUserUid]: (state, action) => ({
    ...state,
    uid: action.payload,
  }),
  [actions.setUserProperties]: (state, action) => ({
    ...state,
    properties: action.payload,
  })
}, initialState)

export default reducer
