import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';

import App from './App.tsx';
import { store } from './Redux/store'; // Убедитесь, что store.ts используется для TypeScript

// Получаем корневой элемент
const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

// Рендерим приложение с маршрутизацией и Redux
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
