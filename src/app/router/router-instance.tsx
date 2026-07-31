import { createBrowserRouter, Navigate } from 'react-router';

export const router = createBrowserRouter([
  /*
   * Public website
   */
  {
    async lazy() {
      const module = await import('@/components/layouts/public-layout');

      return {
        Component: module.default,
      };
    },
    children: [
      {
        index: true,
        async lazy() {
          const module =
            await import('@/components/pages/landing/landing-page');

          return {
            Component: module.default,
          };
        },
      },
      {
        path: 'features',
        async lazy() {
          const module =
            await import('@/components/pages/landing/features-page');

          return {
            Component: module.default,
          };
        },
      },
      {
        path: 'pricing',
        async lazy() {
          const module =
            await import('@/components/pages/landing/pricing-page');

          return {
            Component: module.default,
          };
        },
      },
      {
        path: 'about',
        async lazy() {
          const module = await import('@/components/pages/landing/about-page');

          return {
            Component: module.default,
          };
        },
      },
    ],
  },

  /*
   * Guest-only routes
   */
  {
    async lazy() {
      const module = await import('@/components/routes/guest-route');

      return {
        Component: module.default,
      };
    },
    children: [
      {
        path: '/login',
        async lazy() {
          const module = await import('@/components/pages/auth/login-page');

          return {
            Component: module.default,
          };
        },
      },
      {
        path: '/register',
        async lazy() {
          const module = await import('@/components/pages/auth/register-page');

          return {
            Component: module.default,
          };
        },
      },
    ],
  },

  /*
   * Protected application
   */
  {
    async lazy() {
      const module = await import('@/components/routes/protected-route');

      return {
        Component: module.default,
      };
    },
    children: [
      /*
       * Workspace entry
       *
       * Menentukan workspace aktif, terakhir dibuka,
       * personal workspace, atau mengarahkan ke create workspace.
       */
      {
        path: '/workspaces',
        async lazy() {
          const module =
            await import('@/components/pages/workspace/workspace-entry-page');

          return {
            Component: module.default,
          };
        },
      },

      /*
       * Create workspace
       */
      {
        path: '/workspaces/new',
        async lazy() {
          const module =
            await import('@/components/pages/workspace/new-workspace-page');

          return {
            Component: module.default,
          };
        },
      },

      /*
       * Workspace routes
       */
      {
        path: '/workspaces/:workspaceId',
        async lazy() {
          const module = await import('@/components/layouts/workspace-layout');

          return {
            Component: module.default,
          };
        },
        children: [
          /*
           * /workspaces/:workspaceId
           * → /workspaces/:workspaceId/overview
           */
          {
            index: true,
            element: <Navigate to="overview" replace />,
          },

          /*
           * Workspace overview
           *
           * Component:
           * workspace-page.tsx
           */
          {
            path: 'overview',
            async lazy() {
              const module =
                await import('@/components/pages/workspace/workspace-page');

              return {
                Component: module.default,
              };
            },
          },

          /*
           * Workspace projects
           */
          {
            path: 'projects',
            async lazy() {
              const module =
                await import('@/components/pages/workspace/workspace-projects-page');

              return {
                Component: module.default,
              };
            },
          },

          /*
           * Workspace members
           */
          {
            path: 'members',
            async lazy() {
              const module =
                await import('@/components/pages/workspace/workspace-members-page');

              return {
                Component: module.default,
              };
            },
          },

          /*
           * Workspace settings
           */
          {
            path: 'settings',
            async lazy() {
              const module =
                await import('@/components/pages/workspace/workspace-settings-page');

              return {
                Component: module.default,
              };
            },
          },
        ],
      },

      /*
       * Project routes
       */
      {
        path: '/workspaces/:workspaceId/projects/:projectId',
        async lazy() {
          const module = await import('@/components/layouts/project-layout');

          return {
            Component: module.default,
          };
        },
        children: [
          /*
           * Menentukan halaman awal project berdasarkan status.
           */
          {
            index: true,
            async lazy() {
              const module =
                await import('@/components/pages/project/project-entry-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'processing',
            async lazy() {
              const module =
                await import('@/components/pages/project/project-processing-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'overview',
            async lazy() {
              const module =
                await import('@/components/pages/project/project-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'topics',
            async lazy() {
              const module =
                await import('@/components/pages/project/project-topics-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'sentiment',
            async lazy() {
              const module =
                await import('@/components/pages/project/project-sentiment-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'emotion',
            async lazy() {
              const module =
                await import('@/components/pages/project/project-emotion-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'influence',
            async lazy() {
              const module =
                await import('@/components/pages/project/project-influencer-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'communities',
            async lazy() {
              const module =
                await import('@/components/pages/project/project-communities-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'chat',
            async lazy() {
              const module =
                await import('@/components/pages/project/project-chat-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'dataset',
            async lazy() {
              const module =
                await import('@/components/pages/project/project-dataset-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'settings',
            async lazy() {
              const module =
                await import('@/components/pages/project/project-settings-page');

              return {
                Component: module.default,
              };
            },
          },
        ],
      },

      /*
       * Account settings
       */
      {
        path: '/settings',
        async lazy() {
          const module = await import('@/components/layouts/account-layout');

          return {
            Component: module.default,
          };
        },
        children: [
          /*
           * /settings
           * → /settings/profile
           */
          {
            index: true,
            element: <Navigate to="profile" replace />,
          },

          {
            path: 'profile',
            async lazy() {
              const module =
                await import('@/components/pages/account/profile-settings-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'account',
            async lazy() {
              const module =
                await import('@/components/pages/account/account-settings-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'security',
            async lazy() {
              const module =
                await import('@/components/pages/account/security-settings-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'notifications',
            async lazy() {
              const module =
                await import('@/components/pages/account/notification-settings-page');

              return {
                Component: module.default,
              };
            },
          },

          {
            path: 'appearance',
            async lazy() {
              const module =
                await import('@/components/pages/account/appearance-settings-page');

              return {
                Component: module.default,
              };
            },
          },
        ],
      },
    ],
  },

  /*
   * Error pages
   */
  {
    path: '*',
    async lazy() {
      const module = await import('@/components/pages/not-found-page');

      return {
        Component: module.default,
      };
    },
  },
]);
