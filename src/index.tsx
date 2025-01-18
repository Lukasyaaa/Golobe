import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { state } from "./state/index.ts";
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.body as HTMLElement).render(
    <Provider store={state}>
        <App />
    </Provider>
);