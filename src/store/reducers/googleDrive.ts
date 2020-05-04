import { createSlice, Dispatch } from '@reduxjs/toolkit';
import GoogleDriveService from '../../components/google-drive/GoogleDriveService';

import { RootState } from '../root-reducer';

type SliceState = { 
  rootFolderId: string | undefined,
  fileList: string[] | undefined
 };

const initialState: SliceState = {
  rootFolderId: undefined,
  fileList: undefined
};

export const googleDriveSlice = createSlice({
  name: 'googleDrive',
  initialState,
  reducers: {
    setRootFolder: (state, action) => {
      state.rootFolderId = action.payload;
    },
    setFileList: (state, action) => {
      state.fileList = action.payload
    }
  },
});

export const setInitDataAsync = () => (dispatch: Dispatch) => {
  GoogleDriveService.getRootFolder().then(folderId => {
    dispatch(setRootFolder(folderId));
    GoogleDriveService.listFiles(folderId!).then(files => {
      dispatch(setFileList(files));
    });
  });
};

export const refreshFileList = () => (dispatch: Dispatch, getState: () => RootState ) => {
  const rootFolderId = getState().googleDrive.rootFolderId;
  GoogleDriveService.listFiles(rootFolderId!).then(files => {
    dispatch(setFileList(files));
  });
}

export const { setRootFolder, setFileList } = googleDriveSlice.actions;

export const selectRootFolderId = (state: RootState) => state.googleDrive.rootFolderId!;
export const selectFileList = (state: RootState) => state.googleDrive.fileList;

export default googleDriveSlice.reducer;
