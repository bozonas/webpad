export interface GoogleLoginType {
  onSuccess: (user: gapi.auth2.GoogleUser) => void,
  autoLoad: boolean,
  isSignedIn: boolean,
  onFailure: (reason: {error: string, details: string}) => void,
}

export interface User {
  isAuthorized: boolean,
  user: string,
  userDisplay: string
}