import { RouterProvider } from 'react-router';

import { router } from '@/app/router/router-instance';

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
