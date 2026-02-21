import logo from '@/assets/socialabs-logo.png';
import socia from '@/assets/socia.png';

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { Instagram, Mail, MapPin, Music2, Phone, Twitter } from 'lucide-react';

const steps = [
  {
    title: 'Create a project',
    desc: 'Start by creating a project to organize your social media analysis.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  },
  {
    title: 'Set your keywords',
    desc: 'Define keywords, brands, or topics you want to monitor and analyze.',
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
  },
  {
    title: 'Insights are ready',
    desc: 'Socialabs instantly analyzes data and unlocks all features for you.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
  },
];

const FeaturePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    const timeout = setTimeout(() => {
      setActive((a) => (a + 1) % steps.length);
      setProgress(0);
    }, 200); // delay kecil biar smooth

    return () => clearTimeout(timeout);
  }, [progress]);

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
    <div className="overflow-hidden bg-neutral-50 relative">
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

      <div className="max-w-7xl mx-auto mt-32">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm tracking-widest text-red-500 mb-3">
            CORE FEATURES
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Built to understand social media at scale
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Trend Intelligence */}
          <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Trend Intelligence
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Detect emerging topics and viral signals in real time.
            </p>

            <div className="overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                alt="Trend analytics"
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Sentiment & Context AI
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Understand public opinion beyond positive or negative.
            </p>

            <div className="overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6"
                alt="Sentiment analysis"
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Monitoring */}
          <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Social Media Monitoring
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Track conversations across platforms in one place.
            </p>

            <div className="overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113"
                alt="Social monitoring"
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Big AI Insight */}
          <div className="group bg-white md:col-span-3 rounded-2xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  AI Insight & Recommendation
                </h3>
                <p className="text-gray-600 mb-6">
                  Socialabs transforms complex social data into clear insights
                  and actionable recommendations powered by AI.
                </p>
              </div>

              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
                  alt="AI analytics"
                  className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm tracking-widest text-red-500 mb-3">
            HOW IT WORKS
          </p>
          <h2 className="text-4xl font-semibold text-gray-900">
            Just 3 steps to get started
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Steps */}
          <div className="space-y-10">
            {steps.map((step, index) => {
              const isActive = index === active;
              const isPast = index < active;

              return (
                <div
                  key={index}
                  onClick={() => {
                    setActive(index);
                    setProgress(0);
                  }}
                  className="flex gap-5 cursor-pointer"
                >
                  {/* TIMELINE */}
                  <div className="flex flex-col items-center">
                    {/* DOT */}
                    <span
                      className={`w-3 h-3 rounded-full z-10 ${
                        isActive || isPast ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                    />

                    {/* LINE */}
                    <div className="relative w-px h-16 mt-2 bg-gray-200 overflow-hidden">
                      {/* PAST STEP */}
                      {isPast && (
                        <div className="absolute inset-0 bg-red-500" />
                      )}

                      {/* ACTIVE PROGRESS */}
                      {isActive && (
                        <div
                          className="absolute top-0 left-0 w-px bg-red-500 transition-all"
                          style={{ height: `${progress}%` }}
                        />
                      )}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h3
                      className={`font-semibold mb-1 ${
                        isActive ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <img
                src={steps[active].image}
                alt={steps[active].title}
                className="w-full h-[360px] object-cover transition-all duration-500"
              />
            </div>
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

export default FeaturePage;
