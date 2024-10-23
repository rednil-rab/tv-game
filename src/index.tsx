import React from 'react';
import { createRoot, Container } from 'react-dom/client';
import 'index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';


const domNode = document.getElementById('root');
const root = createRoot(domNode as Container);
root.render(<App/>);

reportWebVitals();
