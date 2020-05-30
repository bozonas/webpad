import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { GoogleFile } from '../../types/GoogleApiTypes';
import { selectFileList } from '../../store/reducers/googleDrive';
import DeleteConfirmDialog from './DeleteConfirmDialog';

const useStyles = makeStyles(() => ({
  progress: {
    marginTop: "50px",
    marginLeft: "40%",
  },
}));

function FileList() {
  const classes = useStyles();
  const fileList = useSelector(selectFileList);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<GoogleFile | undefined>();

  const handleListItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
  };

  const handleDeleteFileClick = (event: React.MouseEvent<HTMLElement>) => {
    setFileToDelete(!!!!!);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setFileToDelete(undefined);
  };

  let buildFileList = () => {
    if (fileList === undefined) {
      return (<Grid item xs={12}><CircularProgress className={classes.progress} /></Grid>);
    }
    if (fileList.length === 0) {
      return ("Folder is empty...");
    }


    return (fileList.map((fileName, index) =>
      <ListItem key={index}
        button
        selected={selectedIndex === index}
        onClick={event => handleListItemClick(event, index)}
      >
        <ListItemText primary={fileName} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="deleteFile"
            onClick={event => handleDeleteFileClick(event)}>
            <DeleteOutlinedIcon style={{ color: "black", margin: 0 }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>));
  };

  return (
    <>
      <List dense >
        {buildFileList()}
      </List>
      <DeleteConfirmDialog open={openDeleteDialog} selectedFile={fileToDelete} onClose={handleDeleteDialogClose}/>
    </>
  );
}

export default FileList;