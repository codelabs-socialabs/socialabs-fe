import { createBrowserRouter, RouterProvider } from 'react-router';
import ProtectedLayout from '@/components/layouts/protected-layout';

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
    element: <ProtectedLayout />,
    children: [
      // AppShell routes (workspace-level pages)
      {
        async lazy() {
          const module = await import('@/components/layouts/app-shell');
          return { Component: module.default };
        },
        children: [
          {
            path: '/app',
            async lazy() {
              const module =
                await import('@/components/pages/workspace/workspace-page');
              return { Component: module.default };
            },
          },
          {
            path: '/app/projects',
            async lazy() {
              const module =
                await import('@/components/pages/project/project-list-page');
              return { Component: module.default };
            },
          },
          {
            path: '/app/analytics',
            async lazy() {
              const module =
                await import('@/components/pages/workspace/global-analytics-page');
              return { Component: module.default };
            },
          },
          {
            path: '/app/team',
            async lazy() {
              const module =
                await import('@/components/pages/workspace/team-members-page');
              return { Component: module.default };
            },
          },
          {
            path: '/app/settings',
            async lazy() {
              const module =
                await import('@/components/pages/workspace/workspace-settings-page');
              return { Component: module.default };
            },
          },
          {
            path: '/app/profile',
            async lazy() {
              const module =
                await import('@/components/pages/workspace/profile-page');
              return { Component: module.default };
            },
          },
          {
            path: '/app/account',
            async lazy() {
              const module =
                await import('@/components/pages/workspace/account-settings-page');
              return { Component: module.default };
            },
          },
        ],
      },
      // ProjectShell routes (project-level pages with own layout)
      {
        path: '/app/projects/:id',
        async lazy() {
          const module = await import('@/components/layouts/project-shell');
          return { Component: module.default };
        },
        children: [
          {
            index: true,
            async lazy() {
              const module =
                await import('@/components/pages/project/detail/project-overview-page');
              return { Component: module.default };
            },
          },
          {
            path: 'topic-modeling',
            async lazy() {
              const module =
                await import('@/components/pages/project/detail/topic-modeling-page');
              return { Component: module.default };
            },
          },
          {
            path: 'sentiment',
            async lazy() {
              const module =
                await import('@/components/pages/project/detail/sentiment-page');
              return { Component: module.default };
            },
          },
          {
            path: 'emotion',
            async lazy() {
              const module =
                await import('@/components/pages/project/detail/emotion-page');
              return { Component: module.default };
            },
          },
          {
            path: 'influencer',
            async lazy() {
              const module =
                await import('@/components/pages/project/detail/influencer-page');
              return { Component: module.default };
            },
          },
          {
            path: 'community',
            async lazy() {
              const module =
                await import('@/components/pages/project/detail/community-page');
              return { Component: module.default };
            },
          },
          {
            path: 'chat',
            async lazy() {
              const module =
                await import('@/components/pages/project/detail/chat-page');
              return { Component: module.default };
            },
          },
          {
            path: 'settings',
            async lazy() {
              const module =
                await import('@/components/pages/project/detail/project-settings-page');
              return { Component: module.default };
            },
          },
        ],
      },
    ],
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
