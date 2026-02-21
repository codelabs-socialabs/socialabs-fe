import logo from '@/assets/socialabs-logo.png';
import projectImage from '@/assets/project.png';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import GameOfLife from '@/components/hero-background';
import {
  TrendingUp,
  Users,
  Lightbulb,
  Zap,
  BadgeCheck,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Music2,
} from 'lucide-react';
import MarqueeRow from '../../ui/marquee-row';

import vector_one from '@/assets/vector-one.png';
import vector_two from '@/assets/vector-two.png';
import socia from '@/assets/socia.png';

const dataWorks = [
  {
    title: 'Search a Keyword',
    desc: 'Enter any topic keyword you want to track',
  },
  {
    title: 'Get Real-Time Trends',
    desc: 'Lorem insum',
  },
  {
    title: 'Explore Keyword Insights',
    desc: 'Lorem insum',
  },
  {
    title: 'Find Top Influencers',
    desc: 'Lorem insum',
  },
  {
    title: 'Take Action',
    desc: 'Lorem insum',
  },
];

const dataChoose = [
  {
    title: 'Real-Time Trends from X.com',
    desc: 'Stay ahead of the conversation with live trend tracking from X, so you never miss what people are talking about right now.',
    icon: TrendingUp,
  },
  {
    title: 'Find Key Influencers',
    desc: 'Quickly identify accounts that shape conversations, amplify messages, and influence opinions in your niche.',
    icon: Users,
  },
  {
    title: 'Actionable Insights',
    desc: 'Turn raw data into clear insights you can act on — from content ideas to strategic decisions.',
    icon: Lightbulb,
  },
  {
    title: 'Simple & Fast Design',
    desc: 'Built for speed and clarity, so you can focus on insights instead of learning complicated tools.',
    icon: Zap,
  },
  {
    title: 'Accurate & Verified Data',
    desc: 'Powered by reliable sources and validation processes to ensure the data you see is trustworthy and relevant.',
    icon: BadgeCheck,
  },
];

const testimonials = [
  {
    name: 'Sarah Kim',
    role: 'Marketer',
    quote: 'Influencer discovery feature is a game-changer.',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Michael Chen',
    role: 'Startup Founder',
    quote: 'Accurate insights and simple UI—perfect for staying ahead.',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Amanda Lee',
    role: 'Content Creator',
    quote: 'Socialabs makes trend research incredibly fast.',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Rina Patel',
    role: 'Social Media Manager',
    quote: 'It saves me hours of research every week.',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    name: 'Nadia Putri',
    role: 'Content Strategist',
    quote: 'Everything is streamlined and updated in real time.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Alex Johnson',
    role: 'Growth Lead',
    quote: 'Clear insights without noise. Exactly what we needed.',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
];

const LandingPage = () => {
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
    <div className="overflow-hidden bg-neutral-50 relative">
      {/* Navbar */}
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

      <div className="mt-52 relative">
        <div className="absolute inset-0 -top-24 z-0 pointer-events-none">
          <GameOfLife />
        </div>

        <div className="max-w-7xl mx-auto  flex flex-col items-center text-center px-6">
          <a
            aria-label="View latest update the changelog page"
            href="#"
            target="_blank"
            className="mx-auto w-full mb-4"
          >
            <div
              className="inline-flex max-w-full items-center gap-3 rounded-full
                        bg-white/5 px-2.5 py-0.5 pr-3 pl-0.5
                        font-medium text-gray-900
                        ring-1 ring-red-500/20
                        shadow-lg shadow-red-500/10
                        backdrop-blur-[1px]
                        transition-colors
                        hover:bg-red-500/5
                        focus:outline-hidden
                        sm:text-sm"
            >
              <span
                className="shrink-0 truncate rounded-full border
                         border-red-200
                        px-2.5 py-1
                        text-sm
                        sm:text-xs"
              >
                News
              </span>

              <span className="flex items-center gap-1 truncate">
                <span className="w-full truncate text-gray-700">
                  Hoaks detection
                </span>
              </span>
            </div>
          </a>

          <h1 className="text-5xl md:text-6xl font-medium tracking-tighter">
            Make decisions faster with{' '}
            <span className="text-red-400">context</span> from social
            conversations
          </h1>

          <div className="mt-8 max-w-2xl space-y-4">
            <p className="text-lg font-medium text-gray-600 leading-relaxed">
              Go from keywords to{' '}
              <span className="text-gray-900 font-semibold">
                actionable insights in under 5 minutes
              </span>
              .
            </p>

            <p className="text-base text-gray-500 leading-relaxed">
              Analyze conversations using topic modeling, network analysis,
              sentiment & emotion — powered by real-time data from X (Twitter).
            </p>
          </div>

          <NavLink
            to={'/login'}
            className="px-4 py-2 bg-red-500 text-white rounded-xl mt-4"
          >
            Try for free
          </NavLink>
        </div>
      </div>

      <div className="mt-20 relative max-w-5xl mx-auto border border-gray-300 rounded-2xl bg-white p-3">
        <img
          src={projectImage}
          alt=""
          className="border border-gray-200 rounded-2xl"
        />
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-1 h-16
                    bg-gradient-to-t from-neutral-50 via-white/80 to-transparent"
        />
      </div>

      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-center text-3xl font-semibold mb-16">
          How socialabs works
        </h2>
        <div className="flex gap-16 justify-center items-center">
          <div className="overflow-hidden rounded-2xl max-w-md">
            <img src={projectImage} className="w-full h-full object-cover" />
          </div>

          <div>
            <p className="text-sm font-semibold mb-6">Steps</p>

            <div className="relative pl-10 border-l space-y-10 border-neutral-200">
              {dataWorks.map((step, index) => (
                <div key={index} className="relative">
                  <span className="absolute -left-14 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-medium ">
                    {index + 1}
                  </span>
                  <h2 className="text-2xl text-gray-700">{step.title}</h2>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold text-center pb-12">
          Why Choose Socialabs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-14">
          {dataChoose.map((item, i) => {
            const Icon = item.icon;
            const isLast = i === dataChoose.length - 1;

            return (
              <div
                key={i}
                className={`
                        flex items-start gap-4
                        ${isLast ? 'md:col-span-2 md:justify-center' : ''}
                    `}
              >
                <div className={`${isLast ? 'max-w-md' : ''} flex gap-4`}>
                  <Icon
                    className="h-6 w-6 text-red-600 mt-1 shrink-0"
                    strokeWidth={1.8}
                  />

                  {/* Text */}
                  <div>
                    <h3 className="font-medium mb-1 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Trusted by Professionals
        </h2>

        <MarqueeRow items={testimonials.slice(0, 3)} />
        <MarqueeRow items={testimonials.slice(2)} reverse />
      </div>

      <div className="max-w-7xl mx-auto mt-16 bg-red-700 rounded-2xl h-48 flex justify-around items-center px-32 relative overflow-hidden">
        <img src={vector_one} className="absolute  right-0 scale-110" />
        <img src={vector_two} className="absolute -left-2 scale-110" />

        <div className="text-white max-w-2xl">
          <h3 className="font-semibold text-lg mb-2">
            Unlock the power of real-time social insights.
          </h3>
          <p className="text-sm text-neutral-200">
            With Socialabs, you don’t just see what’s trending you understand
            the context, the influencers behind it, and the opportunities it
            creates. Turn raw data into clear actions for your campaigns,
            content, or research with confidence.
          </p>
        </div>

        <button className="bg-white text-red-500 px-5 py-3 rounded-full">
          Start Free Trial
        </button>
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

export default LandingPage;
