import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';
import reportWebVitals from './reportWebVitals';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Provider store={store}><App /></Provider>);

reportWebVitals();