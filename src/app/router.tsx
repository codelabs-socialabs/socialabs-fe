import LoginPage from '@/components/pages/auth/login-page';
import RegisterPage from '@/components/pages/auth/register-page';
import AboutPage from '@/components/pages/landing/about-page';
import FeaturePage from '@/components/pages/landing/feature-page';
import LandingPage from '@/components/pages/landing/landing-page';
import PricingPage from '@/components/pages/landing/pricing-page';
import { createBrowserRouter, RouterProvider } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/pricing',
    element: <PricingPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/feature',
    element: <FeaturePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
