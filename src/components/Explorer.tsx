import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../store/reducers/authentication';
import { refreshFileList, selectRootFolderId, selectFileList } from '../store/reducers/googleDrive';
import GoogleDriveService from './google-drive/GoogleDriveService';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 255,
    height: "100%",
  },
  paper: {
    height: "100%",
  },
  title: {
    padding: "5px 5px 5px 10px",
    color: "white",
    background: "#757575"
  },
  button: {
    margin: theme.spacing(1),
    "& span span": {
      margin: 0
    }
  },
}));

function Explorer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuth);
  const rootFolderId = useSelector(selectRootFolderId);
  const fileList = useSelector(selectFileList);

  let buildFileList = () => {
    if (fileList === undefined) {
      return ("Loading...");
    }
    if (fileList.length === 0) {
      return ("Folder is empty...");
    }

    return (fileList.map((fileName, index) =>
      <ListItem key={index}>
        <ListItemText
          primary={fileName}
        />
      </ListItem>));
  };

  const handleCreateFile = () => {
    GoogleDriveService.createFile(rootFolderId, "test.txt").then(file => {
      console.log("create file with id " + file);
    });
  };

  const handleRefreshFileList = () => {
    console.log("trying to dispatch");
    dispatch(refreshFileList());
  };

  return (
    <div className={classes.root}>
      <Paper variant="outlined" square className={classes.paper} >
        <div style={{ display: "flex", background: "#757575", justifyContent: "space-between" }}>
          <Typography variant="h6" className={classes.title}>
            File Explorer
          </Typography>
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
        </div>
        <List dense>
          {buildFileList()}
        </List>
      </Paper>
    </div>
  );
}

export default Explorer;