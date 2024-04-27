import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from '../src/components/AppRouter/AppRouter';
import './index.css';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

const renderApp = () => {
  createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename="/goit-react-hw-08-phonebook">
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('../src/components/AppRouter/AppRouter', () => {
    renderApp();
  });
}
