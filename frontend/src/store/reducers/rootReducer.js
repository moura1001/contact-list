import authReducer from './authReducer'
import contactReducer from './contactReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  contact: contactReducer
});

export default rootReducer