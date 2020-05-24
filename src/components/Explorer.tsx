import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBar from './explorer-comp/ButtonBar';
import FileList from './explorer-comp/FileList';

const useStyles = makeStyles(() => ({
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
}));

function Explorer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper variant="outlined" square className={classes.paper} >
        <div style={{ display: "flex", background: "#757575", justifyContent: "space-between" }}>
          <Typography variant="h6" className={classes.title}>
            File Explorer
          </Typography>
          <ButtonBar/>
        </div>
        <FileList/>
      </Paper>
    </div>
  );
}

export default Explorer;