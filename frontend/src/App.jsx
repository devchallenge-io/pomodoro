import React from 'react';

import Router from './routes';
import './global.css';

export default function App() {
  const html = document.querySelector('html');

  html.setAttribute('theme', 'dark');

  return (
    <Router/>
  );
}

