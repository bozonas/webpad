
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Explorer from './Explorer';
import GoogleLoginButton from './google-authorization/GoogleLoginButton';

export interface LayoutProps {
  children: React.ReactNode
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Layout(props: LayoutProps) {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <GoogleLoginButton
            // onSuccess={() => {
            //   console.log('success');
            //   // GoogleDriveService.listFiles();
            // }}
            // onFailure={() => { console.log('failure') }}
          />
        </Toolbar>
      </AppBar>
      <Explorer />
      {props.children}
    </>
  );
}

export default Layout;