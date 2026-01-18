import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId='982770304458-p9fsd92al00g7cuoa10d4cbtoqb0fkf1.apps.googleusercontent.com'>
          <ToastContainer />
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>

  </React.StrictMode>
);


