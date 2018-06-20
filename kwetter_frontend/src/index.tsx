import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Home from './components/Home';
import './index.css';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <CookiesProvider>
    <Home />
  </CookiesProvider>,
  document.getElementById('root') as HTMLElement
);
