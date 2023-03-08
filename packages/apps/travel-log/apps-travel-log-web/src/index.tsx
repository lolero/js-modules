import React from 'react';
import { createRoot } from 'react-dom/client';
import { TravelLog } from './components/TravelLog';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<TravelLog />);
