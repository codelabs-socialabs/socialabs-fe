import logo from '@/assets/socialabs-logo.png';
import { Instagram, Mail, MapPin, Music2, Phone, Twitter } from 'lucide-react';
import { NavLink } from 'react-router';

const companyLinks = [
  {
    label: 'About Us',
    to: '/about',
  },
  {
    label: 'Features',
    to: '/features',
  },
  {
    label: 'Pricing',
    to: '/pricing',
  },
];

const legalLinks = [
  {
    label: 'Privacy Policy',
    to: '/privacy',
  },
  {
    label: 'Terms and Conditions',
    to: '/terms',
  },
];

const socialLinks = [
  {
    label: '@socialabs',
    href: '#',
    icon: Instagram,
  },
  {
    label: '@socialabs',
    href: '#',
    icon: Twitter,
  },
  {
    label: '@socialabs',
    href: '#',
    icon: Music2,
  },
];

const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.7fr_0.7fr]">
          <div>
            <NavLink to="/" className="inline-flex items-center gap-2">
              <img
                src={logo}
                alt="Socialabs"
                className="size-9 object-contain"
              />

              <span className="text-xl font-semibold tracking-tight text-slate-950">
                Socialabs
              </span>
            </NavLink>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
              Social media analytics platform for discovering trends,
              understanding conversations, and transforming social data into
              actionable insight.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin size={18} className="mt-0.5 shrink-0 text-red-500" />

                <span>
                  Jl. Ir. H. Djuanda No. 162, Lebakgede, Coblong, Bandung, Jawa
                  Barat 40132
                </span>
              </div>

              <a
                href="tel:+6281234567890"
                className="flex items-center gap-3 text-sm text-slate-500 transition hover:text-red-600"
              >
                <Phone size={18} className="shrink-0 text-red-500" />

                <span>+62 812 3456 7890</span>
              </a>

              <a
                href="mailto:support@socialabs.com"
                className="flex items-center gap-3 text-sm text-slate-500 transition hover:text-red-600"
              >
                <Mail size={18} className="shrink-0 text-red-500" />

                <span>support@socialabs.com</span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-950">Company</h2>

            <ul className="mt-4 space-y-3">
              {companyLinks.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="text-sm text-slate-500 transition hover:text-red-600"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-950">Legal</h2>

            <ul className="mt-4 space-y-3">
              {legalLinks.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="text-sm text-slate-500 transition hover:text-red-600"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-950">
              Social Media
            </h2>

            <ul className="mt-4 space-y-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-red-600"
                    >
                      <Icon size={18} className="text-red-500" />

                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Socialabs. All rights reserved.</p>

          <p>Social intelligence with context.</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
