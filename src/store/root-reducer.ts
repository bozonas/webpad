import { combineReducers } from '@reduxjs/toolkit'
import countersReducer from './reducers/counter';
import authenticationReducer from './reducers/authentication';
 
const rootReducer = combineReducers({
  authentication: authenticationReducer,
  counters: countersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;