import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteFile } from '../../store/reducers/googleDrive';

export interface DeleteConfirmDialogProps {
  open: boolean;
  selectedFileId: string | undefined;
  onClose: () => void;
}

export default function DeleteConfirmDialog(props: DeleteConfirmDialogProps) {
  const { open, selectedFileId, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const handleDelete = () => {
    console.log(`deleting file ${selectedFileId}`);
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