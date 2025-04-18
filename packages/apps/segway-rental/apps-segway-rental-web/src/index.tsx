import { createRoot } from 'react-dom/client';
import React from 'react';
import MainApp from './components/MainApp';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
);
