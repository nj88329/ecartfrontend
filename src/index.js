import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "@material-tailwind/react";
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store   } from './app/store';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Auth0Provider
    domain="dev-e7thax701ks1optg.us.auth0.com"
    clientId="7DCJMXXmhH20n2yAsXfw1E5iw1nvQ5T3"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <Provider store = {store}>
    <ChakraProvider>
    <Router>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </Router>
    </ChakraProvider>
  </Provider>
  </Auth0Provider>
  </React.StrictMode>

);
