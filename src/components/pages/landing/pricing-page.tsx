import logo from '@/assets/socialabs-logo.png';
import { Instagram, Mail, MapPin, Music2, Phone, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import socia from '@/assets/socia.png';
import { Check } from 'lucide-react';

const PricingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className=" bg-neutral-50 relative">
      <nav
        className={`w-full h-14 p-2.5 px-6 fixed z-50 my-4 rounded-full left-1/2 -translate-x-1/2 flex items-center justify-between border transition-[max-width, background] duration-500  ${scrolled ? 'max-w-5xl border-gray-200 bg-white/70 backdrop-blur-xl shadow-md' : 'border-none max-w-7xl border-transparent '}`}
      >
        <div className="flex items-center gap-1.5">
          <img src={logo} alt="" className="w-7 h-7" />
          <div className="text-2xl font-semibold tracking-wider">Socialabs</div>
        </div>

        <ul className="flex gap-6 items-center">
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'/feature'}>Feature</NavLink>
          <NavLink to={'/pricing'}>Pricing</NavLink>
          <NavLink to={'/about'}>About</NavLink>
        </ul>

        <NavLink
          to={'/login'}
          className="flex items-center bg-red-500 hover:bg-red-600 cursor-pointer rounded-full h-10 text-white px-4"
        >
          Get Started
        </NavLink>
      </nav>

      <div className="max-w-7xl mx-auto pt-36">
        <h1 className="font-semibold text-4xl text-center pb-2">Pricing</h1>
        <p className="text-center text-gray-700">
          Socialabs offers simple and transparent pricing plans with no
          surprises.
        </p>

        <div className="flex justify-center gap-8 mt-8">
          <div className="border border-gray-300 w-80 h-128 bg-white rounded-2xl p-6 hover:shadow-md">
            <h2 className="font-semibold text-2xl mb-1">Starter</h2>
            <p className="text-gray-600">Best for individual</p>

            <div className="mt-4">
              <div className="flex items-start gap-1">
                <span className="text-xl font-semibold">$</span>
                <span className="text-4xl font-bold">0</span>
                <span className="text-sm text-gray-500">USD</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                /month for one person
              </p>
            </div>

            <button className="mt-6 w-full rounded-lg border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50 transition">
              Get started
            </button>

            <div className="my-6 h-px w-full bg-gray-200" />

            <div className="flex items-center gap-3">
              <Check size={24} />
              Email Support
            </div>
            <div className="flex items-center gap-3">
              <Check size={24} />
              Basic Analytics
            </div>
          </div>

          <div className="border border-red-400 w-80 h-128 bg-white rounded-2xl p-6 hover:shadow-md">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-2xl mb-1">Pro</h2>
              <span className="text-xs font-medium text-red-500">
                — Most popular
              </span>
            </div>
            <p className="text-gray-600">For growing businesses</p>

            <div className="mt-4">
              <div className="flex items-start gap-1">
                <span className="text-xl font-semibold">$</span>
                <span className="text-4xl font-bold">15</span>
                <span className="text-sm text-gray-500">USD</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                /month for one person
              </p>
            </div>

            <button className="mt-6 w-full rounded-lg border bg-red-500 text-white border-red-200 py-2 text-sm font-medium hover:bg-red-700 transition">
              Get started
            </button>

            <div className="my-6 h-px w-full bg-gray-200" />

            <div className="flex items-center gap-3">
              <Check size={24} />
              Email Support
            </div>
            <div className="flex items-center gap-3">
              <Check size={24} />
              Basic Analytics
            </div>
          </div>

          <div className="border border-gray-300 w-80 h-128 bg-white rounded-2xl p-6 hover:shadow-md">
            <h2 className="font-semibold text-2xl mb-1">Enterprice</h2>
            <p className="text-gray-600">For large organizations</p>

            <div className="mt-4">
              <span className="text-2xl font-semibold">Custom</span>
              <p className="text-sm text-gray-500 mt-3">
                /month for one person
              </p>
            </div>

            <button className="mt-6 w-full rounded-lg border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50 transition">
              Contact Us
            </button>

            <div className="my-6 h-px w-full bg-gray-200" />

            <div className="flex items-center gap-3">
              <Check size={24} />
              Email Support
            </div>
            <div className="flex items-center gap-3">
              <Check size={24} />
              Basic Analytics
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-3xl font-semibold text-center mb-2">
          Compare plan features
        </h2>
        <p className="text-sm text-gray-600 text-center">
          Discover our plans and find the one that fits your workspace needs.
        </p>

        <div className="grid grid-cols-4 gap-x-6 mt-16">
          <div className="sticky col-span-4 top-16 z-30 my-6 bg-neutral-50">
            <div className="grid grid-cols-4 gap-x-6 py-4">
              <div className="font-semibold text-gray-900">Feature</div>

              <div>
                <p className="font-semibold">Starter</p>
                <p className="text-gray-600">Free forever</p>
              </div>

              <div>
                <p className="font-semibold">Pro</p>
                <p className="text-gray-600">$15 per month billed</p>
              </div>

              <div>
                <p className="font-semibold">Enterprise</p>
                <p className="text-gray-600">Custom per month billed</p>
              </div>
            </div>

            <div className="h-px bg-gray-300" />
          </div>

          <div className="col-span-4 font-semibold mb-2">General</div>

          <div className="py-3 text-gray-700">Number of seats</div>
          <div className="py-3 border-b border-b-gray-300">1</div>
          <div className="py-3 border-b border-b-gray-300">Up to 3</div>
          <div className="py-3 border-b border-b-gray-300">Unlimited</div>

          <div className="py-3 text-gray-700">Storage</div>
          <div className="py-3 border-b border-b-gray-300">15 GB</div>
          <div className="py-3 border-b border-b-gray-300">1 TB</div>
          <div className="py-3 border-b border-b-gray-300">Unlimited</div>

          <div className="py-3 text-gray-700">Email Sharing</div>
          <div className="py-3 border-b border-b-gray-300">
            <Check size={24} className="text-blue-600"></Check>
          </div>
          <div className="py-3 border-b border-b-gray-300">
            <Check size={24} className="text-blue-600"></Check>
          </div>
          <div className="py-3 border-b border-b-gray-300">
            <Check size={24} className="text-blue-600"></Check>
          </div>

          <div className="py-3 text-gray-700">Any time, anywhere access</div>
          <div className="py-3 font-bold border-b text-gray-400">—</div>
          <div className="py-3 border-b border-b-gray-300">
            <Check size={24} className="text-blue-600"></Check>
          </div>
          <div className="py-3 border-b border-b-gray-300">
            <Check size={24} className="text-blue-600"></Check>
          </div>
        </div>
      </div>

      <footer className="w-full h-80 mt-16 bg-white">
        <div className="max-w-6xl mx-auto pt-16 pb-8 flex gap-12 border-b border-b-gray-300">
          <div>
            <img src={socia} alt="" className="pb-2" />
            <p className="text-sm text-gray-600 whitespace-nowrap">
              Social media analytics tools to extract
            </p>
            <p className="text-sm font-semibold ">trend topic with context.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">CONTACT</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <MapPin size={20} className="mt-0.5" />
                <span>
                  Jl.Ir. H.Djuanda No.162, Lebakgede, Coblong. Kota Bandung,
                  Jawa Barat 40132
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={20} />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={20} />
                <span>support@socialabs.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">COMPANY</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>About us</li>
              <li>Privacy Policy</li>
              <li className="whitespace-nowrap">Terms and Conditions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 whitespace-nowrap">
              SOCIAL MEDIA
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <Instagram size={20} className="text-red-500" />
                <span>@socialabs</span>
              </li>
              <li className="flex items-center gap-2">
                <Twitter size={20} className="text-red-500" />
                <span>@socialabs</span>
              </li>
              <li className="flex items-center gap-2">
                <Music2 size={20} className="text-red-500" />
                <span>@socialabs</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="font-light text-gray-600 text-center mt-8">
          © 2025 Socialabs. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default PricingPage;
