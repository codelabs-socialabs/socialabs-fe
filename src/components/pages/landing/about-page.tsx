import {
  Brain,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useRef, useState } from 'react';

const timelines = [
  {
    id: 'founded',
    year: '2023',
    title: 'Socialabs is founded',
    description:
      'Socialabs began from the need to understand social media noise through clearer, AI-assisted insights.',
  },
  {
    id: 'ai-analytics',
    year: '2024',
    title: 'AI analytics launch',
    description:
      'We released our first AI-powered trend analysis and sentiment detection capabilities.',
  },
  {
    id: 'platform-expansion',
    year: '2025',
    title: 'Platform expansion',
    description:
      'Socialabs expanded its analytics capabilities with topic modeling, emotion analysis, and network intelligence.',
  },
  {
    id: 'collaboration',
    year: '2026',
    title: 'Collaborative intelligence',
    description:
      'The platform evolved into a shared workspace where teams can explore datasets, insights, and strategic findings together.',
  },
];

const values = [
  {
    title: 'Insight over noise',
    description:
      'We transform large volumes of social conversation into clear, contextual insights that support meaningful decisions.',
    icon: Sparkles,
  },
  {
    title: 'AI-driven innovation',
    description:
      'We continuously improve our models to uncover trends, narratives, relationships, and signals at scale.',
    icon: Brain,
  },
  {
    title: 'Data integrity',
    description:
      'We prioritize responsible data practices, transparency, and careful interpretation of social information.',
    icon: ShieldCheck,
  },
  {
    title: 'Collaboration',
    description:
      'Socialabs is built for teams, enabling marketers, researchers, and decision-makers to work from shared context.',
    icon: Users,
  },
  {
    title: 'Scalability',
    description:
      'From individual researchers to larger organizations, the platform is designed to grow with evolving needs.',
    icon: TrendingUp,
  },
  {
    title: 'User-centered decisions',
    description:
      'Every feature is designed to support real decisions, not simply produce more charts or dashboards.',
    icon: Target,
  },
];

const AboutPage = () => {
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  const scrollTimeline = (direction: 'left' | 'right'): void => {
    const container = timelineContainerRef.current;

    if (!container) {
      return;
    }

    const nextIndex =
      direction === 'right'
        ? Math.min(activeTimelineIndex + 1, timelines.length - 1)
        : Math.max(activeTimelineIndex - 1, 0);

    setActiveTimelineIndex(nextIndex);

    container.scrollTo({
      left: nextIndex * 352,
      behavior: 'smooth',
    });
  };

  return (
    <div className="overflow-hidden bg-neutral-50">
      {/* Hero */}
      <section className="relative min-h-[850px] overflow-hidden px-6 pt-32 lg:min-h-[920px] lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/70 blur-3xl" />

          <div className="absolute left-[6%] top-[14%] hidden w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white  shadow-xl shadow-slate-950/10 lg:block xl:left-[9%] xl:w-80">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
              alt="Analytics dashboard"
              className="h-48 w-full rounded-xl object-cover xl:h-52"
            />
          </div>

          <div className="absolute right-[7%] top-[18%] hidden w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white  shadow-xl shadow-slate-950/10 lg:block xl:right-[10%] xl:w-72">
            <img
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd"
              alt="Team analyzing social data"
              className="h-44 w-full rounded-xl object-cover xl:h-48"
            />
          </div>

          <div className="absolute bottom-[10%] left-[3%] hidden w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white  shadow-xl shadow-slate-950/10 lg:block xl:left-[7%] xl:w-96">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
              alt="Social media trend discussion"
              className="h-48 w-full rounded-xl object-cover xl:h-56"
            />
          </div>

          <div className="absolute bottom-[10%] right-[4%] hidden w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white  shadow-xl shadow-slate-950/10 lg:block xl:right-[7%] xl:w-80">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Collaborative team workspace"
              className="h-48 w-full rounded-xl object-cover xl:h-52"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-3xl items-center justify-center text-center lg:min-h-[760px]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              The Socialabs Story
            </p>

            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 md:text-5xl lg:text-6xl">
              Making <span className="text-red-500">social data</span>{' '}
              meaningful
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Socialabs is an AI-powered social intelligence platform that helps
              teams understand conversations, discover emerging narratives, and
              turn complex social data into actionable insight.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
              Our Mission
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Understand the context behind every conversation
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-slate-600">
            <p>
              Social conversations move quickly and often contain fragmented
              opinions, emotional reactions, repeated claims, and competing
              narratives. Traditional dashboards may show volume, but they do
              not always explain what is actually happening.
            </p>

            <p>
              Socialabs combines topic modeling, sentiment and emotion analysis,
              influencer discovery, and social network analysis to help users
              see both the scale and the structure of public conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
              Our Journey
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              A brief history
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
              See how Socialabs evolved from an early analytics concept into a
              platform for understanding social conversations at scale.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollTimeline('left')}
              disabled={activeTimelineIndex === 0}
              aria-label="View previous timeline item"
              className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => scrollTimeline('right')}
              disabled={activeTimelineIndex === timelines.length - 1}
              aria-label="View next timeline item"
              className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-[7px] h-px bg-slate-200" />

          <div
            ref={timelineContainerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {timelines.map((item, index) => (
              <article key={item.id} className="min-w-[320px] snap-start">
                <span
                  className={`relative z-10 block size-4 rounded-full border-4 border-neutral-50 transition ${
                    index <= activeTimelineIndex ? 'bg-red-500' : 'bg-slate-300'
                  }`}
                />

                <p className="mt-6 text-3xl font-semibold tracking-tight text-red-500">
                  {item.year}
                </p>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
              Our Values
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Principles behind the platform
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              These values guide how we design Socialabs, interpret social data,
              and create tools that help users make better decisions.
            </p>
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="group">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 font-semibold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-red-700 px-7 py-14 text-white md:px-12">
          <div className="absolute -right-20 -top-24 size-72 rounded-full border border-white/10" />

          <div className="absolute -bottom-28 left-1/3 size-72 rounded-full border border-white/10" />

          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-100">
              Building with Context
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Better decisions begin with a clearer understanding of the
              conversation
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-red-100">
              Socialabs helps teams move beyond surface-level metrics and
              understand the narratives, emotions, communities, and people
              shaping public discussion.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
