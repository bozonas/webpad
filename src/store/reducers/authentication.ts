import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';

type SliceState = { isAuthenticated: boolean };

const initialState: SliceState = { isAuthenticated:  false};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    logIn: (state, action) => {
      console.log("setting global state to True");
      console.log(`${action.payload}`);
      state.isAuthenticated = true;
    },
    logOut: state => {
      console.log("setting global state to True");
      state.isAuthenticated = false;
    }
  },
});

export const { logIn, logOut } = counterSlice.actions;

export const selectAuth = (state: RootState) => state.authentication.isAuthenticated;

export default counterSlice.reducer;
