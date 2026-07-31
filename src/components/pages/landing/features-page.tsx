import { useEffect, useState } from 'react';

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
  const [active, setActive] = useState(0);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((current) => Math.min(current + 1, 100));
    }, 40);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress < 100) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setActive((current) => (current + 1) % steps.length);

      setProgress(0);
    }, 200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [progress]);

  return (
    <div className="overflow-hidden bg-neutral-50">
      {/* Core features */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-red-500">
            Core Features
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Built to understand social media at scale
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            Explore the tools Socialabs provides to monitor conversations,
            understand public response, and discover meaningful insights.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Trend intelligence */}
          <article className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-950/5">
            <h2 className="font-semibold text-slate-950">Trend Intelligence</h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Detect emerging topics and viral signals in real time.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                alt="Trend analytics dashboard"
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </article>

          {/* Sentiment analysis */}
          <article className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-950/5">
            <h2 className="font-semibold text-slate-950">
              Sentiment and Context AI
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Understand public opinion beyond simple positive or negative
              classifications.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6"
                alt="Sentiment analysis visualization"
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </article>

          {/* Monitoring */}
          <article className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-950/5">
            <h2 className="font-semibold text-slate-950">
              Social Media Monitoring
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Track relevant conversations and public responses from one
              organized workspace.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113"
                alt="Social media monitoring"
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </article>

          {/* AI insight */}
          <article className="group rounded-2xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-950/5 md:col-span-3">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-500">
                  AI Analysis
                </p>

                <h2 className="mt-3 text-xl font-semibold text-slate-950 md:text-2xl">
                  Insight and recommendation
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
                  Socialabs transforms complex social data into clear findings,
                  contextual summaries, and actionable recommendations powered
                  by AI.
                </p>
              </div>

              <div className="overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
                  alt="AI analytics and recommendation"
                  className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mb-20 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-red-500">
              How It Works
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Just three steps to get started
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
              Create a project, define the conversation you want to monitor, and
              let Socialabs process the results.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Steps */}
            <div className="space-y-2">
              {steps.map((step, index) => {
                const isActive = index === active;

                const isPast = index < active;

                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => {
                      setActive(index);
                      setProgress(0);
                    }}
                    className="flex w-full gap-5 rounded-2xl p-4 text-left transition hover:bg-slate-50"
                  >
                    <div className="flex shrink-0 flex-col items-center">
                      <span
                        className={`relative z-10 size-3 rounded-full transition-colors ${
                          isActive || isPast ? 'bg-red-500' : 'bg-slate-300'
                        }`}
                      />

                      {index < steps.length - 1 && (
                        <div className="relative mt-2 h-20 w-px overflow-hidden bg-slate-200">
                          {isPast && (
                            <div className="absolute inset-0 bg-red-500" />
                          )}

                          {isActive && (
                            <div
                              className="absolute left-0 top-0 w-px bg-red-500"
                              style={{
                                height: `${progress}%`,
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pb-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-500">
                        Step {index + 1}
                      </p>

                      <h3
                        className={`mt-2 font-semibold transition-colors ${
                          isActive ? 'text-slate-950' : 'text-slate-500'
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-500">
                        {step.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Visual */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/5">
              <img
                key={steps[active].image}
                src={steps[active].image}
                alt={steps[active].title}
                className="h-[360px] w-full rounded-2xl object-cover animate-in fade-in duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturePage;
