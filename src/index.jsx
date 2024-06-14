import React from 'react';
import { createRoot } from 'react-dom/client';
// import './src/components/style.scss';
import App from './App';

const root = createRoot(document.getElementById('main'));
root.render(<App />);