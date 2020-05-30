import { createSlice, Dispatch } from '@reduxjs/toolkit';
import GoogleDriveService from '../../components/google-drive/GoogleDriveService';
import { GoogleFile } from '../../types/GoogleApiTypes';

import { RootState } from '../root-reducer';

type SliceState = { 
  rootFolderId: string | undefined,
  fileList: GoogleFile[] | undefined
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
    },
    clearFileList: state => {
      state.fileList = undefined
    },
    removeFile: (state, action) => {
      state.fileList!.splice(
        state.fileList!.findIndex(file => 
          file.fileId === action.payload.fileId), 1);
    },
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

export const refreshFileList = () => (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(clearFileList());
  const rootFolderId = getState().googleDrive.rootFolderId;
  GoogleDriveService.listFiles(rootFolderId!).then(files => {
    dispatch(setFileList(files));
  });
}

export const deleteFile = (file: GoogleFile) => (dispatch: Dispatch, getState: () => RootState) => {
  GoogleDriveService.deleteFile(file.fileId);
  dispatch(removeFile(file));
}

export const { setRootFolder, setFileList, clearFileList, removeFile } = googleDriveSlice.actions;

export const selectRootFolderId = (state: RootState) => state.googleDrive.rootFolderId!;
export const selectFileList = (state: RootState) => state.googleDrive.fileList;

export default googleDriveSlice.reducer;
