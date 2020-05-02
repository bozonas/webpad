// import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES, JS_SRC } from '../../constants/gapi';

export class GoogleApiService {
//   async loadGapi(onSuccess: (user: gapi.auth2.GoogleUser) => void,
//     onFailure: (reason: {error: string, details: string}) => void) {

//     const script = document.createElement('script');
//     script.src = JS_SRC;
//     script.defer = true;
//     script.async = true;
//     script.onload = () => {
//       window.gapi.load('client:auth2', () => {
//         if (!window.gapi.auth2.getAuthInstance()) {
//           window.gapi.client.init({
//             apiKey: API_KEY,
//             clientId: CLIENT_ID,
//             discoveryDocs: DISCOVERY_DOCS,
//             scope: SCOPES
//           }).then(() => {
//               const auth2 = window.gapi.auth2.getAuthInstance(); 
//               // setLoaded(true)
//               if (auth2.isSignedIn.get()) {
//                 onSuccess(auth2.currentUser.get())
//               }
//             },
//             err => onFailure(err)
//           );
//         }
//       });
//     };

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     }
//   }

//   signIn(onSuccess: (user: gapi.auth2.GoogleUser) => void,
//     onFailure: (reason: {error: string, details: string}) => void) {
//       const auth2 = window.gapi.auth2.getAuthInstance();
//       auth2.signIn().then(res => onSuccess(res), err => onFailure(err));
//   }
}

const googleApiService = new GoogleApiService();

export default googleApiService;
