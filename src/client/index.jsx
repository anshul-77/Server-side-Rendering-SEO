import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';
import ClientOnly from './components/ClientOnly';

hydrateRoot(document.getElementById('root'),
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ClientOnly/>
    </BrowserRouter>
  </React.StrictMode>);