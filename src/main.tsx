import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './app/router';
import { AppProvider } from './app/provider';
import { Toaster } from '@/components/ui/sonner';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <AppRouter />
      <Toaster />
    </AppProvider>
  </StrictMode>,
);
