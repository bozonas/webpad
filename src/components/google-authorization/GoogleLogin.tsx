import { useState, useEffect } from 'react';
import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES, JS_SRC } from '../../constants/gapi';
import { GoogleLoginType } from '../../types/GoogleApiTypes';

const GoogleLogin = ({
  onSuccess,
  autoLoad,
  isSignedIn,
  onFailure,
} : GoogleLoginType) => {
  const [loaded, setLoaded] = useState(false)

  // function handleSigninSuccess(res: gapi.auth2.GoogleUser) {
  //   const basicProfile = res.getBasicProfile()
  //   const authResponse = res.getAuthResponse()
  //   onSuccess(res)
  // }

  function signIn() {
    if (loaded) {
      const auth2 = window.gapi.auth2.getAuthInstance()
        auth2.signIn().then(res => onSuccess(res), err => onFailure(err));
    }
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = JS_SRC;
    script.defer = true;
    script.async = true;
    script.onload = initClient;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  useEffect(() => {
    if (autoLoad) {
      signIn()
    }
  }, [loaded]);

  function initClient() {
    window.gapi.load('client:auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(() => {
            const auth2 = window.gapi.auth2.getAuthInstance(); 
            setLoaded(true)
            if (isSignedIn && auth2.isSignedIn.get()) {
              onSuccess(auth2.currentUser.get())
            }
          },
          err => onFailure(err)
        );
      }
    });
  }

  return { signIn, loaded }
}

export default GoogleLogin