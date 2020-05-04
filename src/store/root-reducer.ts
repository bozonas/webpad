import { combineReducers } from '@reduxjs/toolkit'
import countersReducer from './reducers/counter';
import authenticationReducer from './reducers/authentication';
import googleDriveReducer from './reducers/googleDrive';
 
const rootReducer = combineReducers({
  authentication: authenticationReducer,
  googleDrive: googleDriveReducer,
  counters: countersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;