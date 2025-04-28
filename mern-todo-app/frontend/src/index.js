import React from 'react';
import { createRoot } from 'react-dom/client';  // 👈 new import
import App from './App';
// (optional) remove or keep if you created it
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);              // 👈 create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
