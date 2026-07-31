import logo from '@/assets/socialabs-logo.png';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

const navigationItems = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Features',
    to: '/features',
  },
  {
    label: 'Pricing',
    to: '/pricing',
  },
  {
    label: 'About',
    to: '/about',
  },
];

const PublicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCloseMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  const handleToggleMobileMenu = (): void => {
    setIsMobileMenuOpen((current) => !current);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Public navigation"
        className={`pointer-events-auto mx-auto flex h-16 items-center justify-between rounded-full border px-4 transition-all duration-500 sm:px-5 ${
          isScrolled
            ? 'max-w-5xl border-slate-200 bg-white/90 shadow-lg shadow-slate-950/5 backdrop-blur-xl'
            : 'max-w-7xl border-transparent bg-white/55 backdrop-blur-md'
        }`}
      >
        <NavLink
          to="/"
          aria-label="Go to Socialabs home"
          onClick={handleCloseMobileMenu}
          className="flex shrink-0 items-center gap-2"
        >
          <img src={logo} alt="Socialabs" className="size-8 object-contain" />

          <span className="text-xl font-semibold tracking-tight text-slate-950">
            Socialabs
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-red-50 text-red-600'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink
            to="/login"
            className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Get Started
          </NavLink>
        </div>

        <button
          type="button"
          aria-label={
            isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={isMobileMenuOpen}
          onClick={handleToggleMobileMenu}
          className="flex size-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 md:hidden"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="pointer-events-auto mx-auto mt-2 max-w-7xl px-1 md:hidden">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-950/10">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={handleCloseMobileMenu}
                  className={({ isActive }) =>
                    `flex rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-red-50 text-red-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
              <NavLink
                to="/login"
                onClick={handleCloseMobileMenu}
                className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Sign In
              </NavLink>

              <NavLink
                to="/login"
                onClick={handleCloseMobileMenu}
                className="flex items-center justify-center rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Get Started
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
