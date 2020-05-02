import React from 'react';
import GoogleLoginButton from './google-authorization/GoogleLoginButton';
import GoogleDriveService from './google-drive/GoogleDriveService';

function Main() {
  return(
    <div className="App">
    <header className="App-header">
        <br />
        <br />
        {/* <GoogleLoginButton
          onSuccess={() => {
            console.log('success');
            GoogleDriveService.listFiles();
          }}
          onFailure={() => { console.log('failure') }}
        /> */}
        {/* <GoogleLogin
          clientId="148617306855-a52c71nknsf82dqth723r4h4qa73og2p.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          scope={'https://www.googleapis.com/auth/drive.metadata.readonly'}
        /> */}
    </header>
  </div>
  );
}

export default Main;