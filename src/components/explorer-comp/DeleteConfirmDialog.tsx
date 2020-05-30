import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import { GoogleFile } from '../../types/GoogleApiTypes';
import { deleteFile } from '../../store/reducers/googleDrive';

export interface DeleteConfirmDialogProps {
  open: boolean;
  selectedFile: GoogleFile | undefined;
  onClose: () => void;
}

export default function DeleteConfirmDialog(props: DeleteConfirmDialogProps) {
  const { open, selectedFile, onClose } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    dispatch(deleteFile(selectedFile!));
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this file?"}</DialogTitle>
      <DialogActions>
        <Button onClick={handleDelete}
          startIcon={<DeleteIcon />}
          variant="contained"
          color="secondary">
          Delete
          </Button>
        <Button onClick={handleClose}
          variant="contained"
          color="primary"
          autoFocus>
          Cancel
          </Button>
      </DialogActions>
    </Dialog>
  );
}