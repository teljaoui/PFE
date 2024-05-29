import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { legacy_createStore } from '@reduxjs/toolkit';
import reducer from './config/Reducer';
const store = legacy_createStore(reducer);
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
      <Provider store={store}>
                  <App />
      </Provider>
);

