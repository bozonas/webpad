import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/reducers/authentication';
import GoogleDriveService from './google-drive/GoogleDriveService';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 255,
  },
  title: {
    padding: "16px",
    color: "white",
    background: "#757575"
  },
}));

function Explorer() {
  const classes = useStyles();
  const isAuthenticated = useSelector(selectAuth);
  const [files, setFiles] = useState<string[] | undefined>();

  useEffect(() => {
    if (isAuthenticated) {
      GoogleDriveService.listFiles().then(files => {
        setFiles(files);
      });
    }

  }, [isAuthenticated]);

  let createFileList = () => {
    if (files === undefined) {
      return ("Loading...");
    }
    if (files.length == 0) {
      return ("Folder is empty...");
    }

    return (files.map((fileName, index) => 
    <ListItem key={index}>
      <ListItemText
        primary={fileName}
      />
    </ListItem>));
  };

  return (
    <div className={classes.root}>
      <Paper variant="outlined" square >
        <div id='test'>
          <Typography variant="h6" className={classes.title}>
            File Explorer
          </Typography>
        </div>
        <List dense>
            {createFileList()}
        </List>
      </Paper>
    </div>
  );
}

export default Explorer;