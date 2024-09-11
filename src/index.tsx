import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.body as HTMLElement).render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();