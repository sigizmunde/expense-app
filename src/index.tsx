import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import '@fontsource/montserrat';
import axios from 'axios';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';
import { theme } from './styles/theme';
import App from './App';
import { tokenRefreshOnExpire } from './services/tokenRefreshOnExpire';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.request.use(tokenRefreshOnExpire, null);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
