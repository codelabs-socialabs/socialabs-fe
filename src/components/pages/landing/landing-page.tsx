import projectImage from '@/assets/project.png';
import vectorOne from '@/assets/vector-one.png';
import vectorTwo from '@/assets/vector-two.png';
import GameOfLife from '@/components/hero-background';
import MarqueeRow from '@/components/ui/marquee-row';
import { BadgeCheck, Lightbulb, TrendingUp, Users, Zap } from 'lucide-react';
import { NavLink } from 'react-router';

const dataWorks = [
  {
    title: 'Search a Keyword',
    description:
      'Enter the topic, keyword, hashtag, or account that you want to monitor.',
  },
  {
    title: 'Collect Conversations',
    description:
      'Socialabs collects relevant public conversations based on your project scope.',
  },
  {
    title: 'Analyze the Context',
    description:
      'Discover topics, sentiment, emotion, communities, and conversation patterns.',
  },
  {
    title: 'Find Key Influencers',
    description:
      'Identify originators, amplifiers, and bridge accounts shaping the discussion.',
  },
  {
    title: 'Take Action',
    description:
      'Turn the analysis into clear decisions, reports, and strategic recommendations.',
  },
];

const dataChoose = [
  {
    title: 'Real-Time Social Trends',
    description:
      'Stay ahead of conversations with trend monitoring, so you understand what people are discussing as narratives develop.',
    icon: TrendingUp,
  },
  {
    title: 'Find Key Influencers',
    description:
      'Identify accounts that originate conversations, amplify narratives, and connect separate communities.',
    icon: Users,
  },
  {
    title: 'Actionable Insights',
    description:
      'Transform complex social data into clear findings that support campaigns, research, and strategic decisions.',
    icon: Lightbulb,
  },
  {
    title: 'Simple and Fast',
    description:
      'A clean workflow helps you move from collection to insight without dealing with unnecessarily complicated tools.',
    icon: Zap,
  },
  {
    title: 'Reliable Analysis',
    description:
      'Use structured processing and AI-assisted analysis to understand the context behind social conversations.',
    icon: BadgeCheck,
  },
];

const testimonials = [
  {
    name: 'Sarah Kim',
    role: 'Marketer',
    quote: 'Influencer discovery is a game-changer for our campaign research.',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Michael Chen',
    role: 'Startup Founder',
    quote:
      'Accurate insights and a simple workflow make it easy to stay ahead.',
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
    quote: 'It saves our team hours of research every week.',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    name: 'Nadia Putri',
    role: 'Content Strategist',
    quote: 'Everything feels streamlined and easy to understand.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Alex Johnson',
    role: 'Growth Lead',
    quote: 'Clear insights without unnecessary noise.',
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
];

const LandingPage = () => {
  return (
    <div className="overflow-hidden bg-neutral-50">
      {/* Hero */}
      <section className="relative px-6 pb-12 pt-48">
        <div className="pointer-events-none absolute inset-x-0 top-20 z-0 h-[560px]">
          <GameOfLife />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">
          <NavLink
            to="/features"
            className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/70 px-2 py-1 pr-4 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-md transition hover:border-red-300 hover:bg-red-50"
          >
            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white">
              New
            </span>
            Hoax detection is coming soon
          </NavLink>

          <h1 className="mt-7 max-w-5xl text-5xl font-semibold tracking-[-0.045em] text-slate-950 md:text-6xl lg:text-7xl">
            Make faster decisions with{' '}
            <span className="text-red-500">context</span> from social
            conversations
          </h1>

          <div className="mt-7 max-w-2xl">
            <p className="text-lg leading-relaxed text-slate-600">
              Move from keywords to actionable insights using topic modeling,
              social network analysis, sentiment, emotion, and influencer
              discovery.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <NavLink
              to="/login"
              className="inline-flex min-w-36 items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Try for Free
            </NavLink>

            <NavLink
              to="/features"
              className="inline-flex min-w-36 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Explore Features
            </NavLink>
          </div>
        </div>
      </section>

      {/* Product preview */}
      <section className="relative mx-auto mt-14 max-w-5xl px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-2.5 shadow-2xl shadow-slate-950/10">
          <img
            src={projectImage}
            alt="Socialabs project analytics dashboard"
            className="w-full rounded-2xl border border-slate-100 object-cover"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-6 -bottom-1 h-20 bg-gradient-to-t from-neutral-50 via-neutral-50/80 to-transparent" />
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-600">
            Workflow
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            How Socialabs works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
            A focused workflow designed to help you move from social data
            collection to useful insight.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-950/5">
            <img
              src={projectImage}
              alt="Socialabs analysis workflow"
              className="w-full rounded-2xl object-cover"
            />
          </div>

          <div>
            <p className="mb-7 text-sm font-semibold text-slate-950">
              Five simple steps
            </p>

            <div className="relative space-y-8 border-l border-slate-200 pl-10">
              {dataWorks.map((step, index) => (
                <div key={step.title} className="relative">
                  <span className="absolute -left-[57px] flex size-8 items-center justify-center rounded-full border border-red-200 bg-white text-sm font-semibold text-red-600 shadow-sm">
                    {index + 1}
                  </span>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-600">
              Why Socialabs
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Built for clearer social intelligence
            </h2>
          </div>

          <div className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {dataChoose.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === dataChoose.length - 1;

              return (
                <article
                  key={item.title}
                  className={`flex gap-4 ${
                    isLast ? 'md:col-span-2 md:mx-auto md:max-w-xl' : ''
                  }`}
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-600">
            Testimonials
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Trusted by professionals
          </h2>
        </div>

        <div className="mt-14 space-y-4">
          <MarqueeRow items={testimonials.slice(0, 3)} />

          <MarqueeRow items={testimonials.slice(2)} reverse />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-red-700 px-6 py-14 md:px-12">
          <img
            src={vectorOne}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-full opacity-50"
          />

          <img
            src={vectorTwo}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-full opacity-50"
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl text-white">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Unlock the power of real-time social insights
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-red-100">
                Understand the context behind trends, discover the people
                shaping the conversation, and turn complex data into clear
                strategic actions.
              </p>
            </div>

            <NavLink
              to="/login"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Start Free Trial
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
