import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import uiReducer from './reducers/uiReducer'

const initialState = {};
const middleware = [thunk];

const reducer = combineReducers({
  user: userReducer,
  UI: uiReducer
});

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
);

export default store;