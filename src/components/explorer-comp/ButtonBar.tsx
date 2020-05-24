import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import Button from '@material-ui/core/Button';
import { selectAuth } from '../../store/reducers/authentication';
import { selectRootFolderId, refreshFileList } from '../../store/reducers/googleDrive';
import GoogleDriveService from '../google-drive/GoogleDriveService';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    "& span span": {
      margin: 0
    }
  },
}));

function ButtonBar() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuth);
  const rootFolderId = useSelector(selectRootFolderId);

  const handleRefreshFileList = () => {
    dispatch(refreshFileList());
  };

  const handleCreateFile = () => {
    GoogleDriveService.createFile(rootFolderId, "test.txt").then(file => {
      console.log("create file with id " + file);
    });
  };

  return (
    <div>
      <Button
        onClick={handleRefreshFileList}
        variant="contained"
        disabled={!isAuthenticated}
        disableElevation
        style={{ color: "white", padding: "5px", minWidth: 0 }}
        className={classes.button}
        startIcon={<RefreshRoundedIcon style={{ color: "black", margin: 0 }} />}
      >{""}</Button>
      <Button
        onClick={handleCreateFile}
        variant="contained"
        disabled={!isAuthenticated}
        disableElevation
        style={{ color: "white", padding: "5px", minWidth: 0 }}
        className={classes.button}
        startIcon={<NoteAddOutlinedIcon style={{ color: "black", margin: 0 }} />}
      >{""}</Button>
    </div>
  );
}

export default ButtonBar;
