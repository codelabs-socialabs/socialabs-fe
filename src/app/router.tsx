import { createBrowserRouter, RouterProvider } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    async lazy() {
      const module = await import('@/components/pages/landing/landing-page');
      return { Component: module.default };
    },
  },
  {
    path: '/pricing',
    async lazy() {
      const module = await import('@/components/pages/landing/pricing-page');
      return { Component: module.default };
    },
  },
  {
    path: '/about',
    async lazy() {
      const module = await import('@/components/pages/landing/about-page');
      return { Component: module.default };
    },
  },
  {
    path: '/feature',
    async lazy() {
      const module = await import('@/components/pages/landing/feature-page');
      return { Component: module.default };
    },
  },
  {
    path: '/login',
    async lazy() {
      const module = await import('@/components/pages/auth/login-page');
      return { Component: module.default };
    },
  },
  {
    path: '/register',
    async lazy() {
      const module = await import('@/components/pages/auth/register-page');
      return { Component: module.default };
    },
  },
  {
    path: '/app',
    async lazy() {
      const module =
        await import('@/components/pages/workspace/workspace-page');
      return { Component: module.default };
    },
  },
  {
    path: '*',
    async lazy() {
      const module = await import('@/components/pages/not-found-page');
      return { Component: module.default };
    },
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
