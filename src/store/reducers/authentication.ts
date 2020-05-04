import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../root-reducer';
import { setInitDataAsync } from './googleDrive';

type SliceState = { 
  isAuthenticated: boolean,
 };

const initialState: SliceState = {
  isAuthenticated: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isAuthenticated = true;
    },
    setRootFolder: (state, action) => {
    },
    logOut: state => {
      state.isAuthenticated = false;
    }
  },
});

export const logInAsync = () => (dispatch: Dispatch) => {
  dispatch(logIn());
  dispatch<any>(setInitDataAsync());
};

export const { logIn, setRootFolder, logOut } = authenticationSlice.actions;

export const selectAuth = (state: RootState) => state.authentication.isAuthenticated;

export default authenticationSlice.reducer;
