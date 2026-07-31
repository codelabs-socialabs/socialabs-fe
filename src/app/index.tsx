import AuthProvider from '@/app/provider';
import { AppRouter } from '@/app/router/router';
import { Toaster } from 'sonner';

export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster position="bottom-right" duration={2500} richColors />
    </AuthProvider>
  );
};
