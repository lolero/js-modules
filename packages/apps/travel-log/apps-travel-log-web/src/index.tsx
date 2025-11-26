import React from 'react';
import { createRoot } from 'react-dom/client';
import { TravelLogWeb } from './components/TravelLogWeb';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<TravelLogWeb />);
