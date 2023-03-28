import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Globalstyles from './components/Globalstyles';
import { CookiesProvider } from 'react-cookie';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <GoogleOAuthProvider clientId="385358619632-0batnu3mfm8onvkr5s60df3kdltpbj0h.apps.googleusercontent.com">
      <React.StrictMode>
         <Globalstyles>
            <CookiesProvider sameSite="strict" secure="true">
               <App />
            </CookiesProvider>
         </Globalstyles>
      </React.StrictMode>
   </GoogleOAuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
