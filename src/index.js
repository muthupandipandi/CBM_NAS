import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import { Provider } from 'react-redux'
import configureStore from './store';
import 'react-app-polyfill/ie11';
const MainIndex=(
  <Provider store={configureStore()}>
      <App/>
  </Provider>
   )



ReactDOM.render(MainIndex, document.getElementById('root'));

