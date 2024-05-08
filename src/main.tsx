import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ExpenseProvider } from './context/ExpenseContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ExpenseProvider>
      <App />
    </ExpenseProvider>
  </React.StrictMode>,
);
