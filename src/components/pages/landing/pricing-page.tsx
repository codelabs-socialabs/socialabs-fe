import { Check, Minus } from 'lucide-react';
import { NavLink } from 'react-router';

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  pricePrefix?: string;
  priceSuffix?: string;
  billingDescription: string;
  actionLabel: string;
  actionPath: string;
  highlighted?: boolean;
  badge?: string;
  features: string[];
}

interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  pro: string | boolean;
  enterprise: string | boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'Best for individuals exploring social analytics.',
    price: '0',
    pricePrefix: '$',
    priceSuffix: 'USD',
    billingDescription: 'Free forever for one person',
    actionLabel: 'Get Started',
    actionPath: '/register',
    features: [
      '1 active workspace',
      'Basic social analytics',
      'Limited data collection',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    description: 'For growing teams that need deeper social insights.',
    price: '15',
    pricePrefix: '$',
    priceSuffix: 'USD',
    billingDescription: 'Per member, billed monthly',
    actionLabel: 'Start Pro',
    actionPath: '/register',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Up to 3 workspace members',
      'Advanced AI analytics',
      'Influencer and community analysis',
      'Dataset export',
      'Priority email support',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For organizations with advanced data and security needs.',
    price: 'Custom',
    billingDescription: 'Flexible plans based on your organization',
    actionLabel: 'Contact Sales',
    actionPath: '/contact',
    features: [
      'Unlimited workspace members',
      'Custom data limits',
      'Advanced access controls',
      'Dedicated onboarding',
      'Priority support',
    ],
  },
];

const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Workspace members',
    starter: '1',
    pro: 'Up to 3',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Active projects',
    starter: '1',
    pro: '10',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Collected posts per month',
    starter: '10,000',
    pro: '100,000',
    enterprise: 'Custom',
  },
  {
    feature: 'Topic modeling',
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Sentiment analysis',
    starter: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Emotion analysis',
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Influencer analysis',
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Community detection',
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Dataset export',
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Priority support',
    starter: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: 'Custom onboarding',
    starter: false,
    pro: false,
    enterprise: true,
  },
];

const ComparisonValue = ({ value }: { value: string | boolean }) => {
  if (typeof value === 'string') {
    return <span className="text-sm text-slate-700">{value}</span>;
  }

  if (value) {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-full bg-red-50 text-red-600">
        <Check size={15} strokeWidth={2.2} />
      </span>
    );
  }

  return (
    <span className="inline-flex size-7 items-center justify-center text-slate-300">
      <Minus size={16} />
    </span>
  );
};

const PricingPage = () => {
  return (
    <div className="overflow-hidden bg-neutral-50">
      {/* Hero */}
      <section className="px-6 pb-16 pt-36 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
            Pricing
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.035em] text-slate-950 md:text-5xl">
            Simple plans for every stage of your social research
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500">
            Start for free, upgrade when you need deeper analytics, or build a
            custom plan for your organization.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex h-full flex-col rounded-3xl border bg-white p-7 transition duration-300 ${
                plan.highlighted
                  ? 'border-red-300 shadow-xl shadow-red-950/5 ring-1 ring-red-200'
                  : 'border-slate-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/5'
              }`}
            >
              {plan.badge && (
                <span className="absolute right-5 top-5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 ring-1 ring-inset ring-red-200">
                  {plan.badge}
                </span>
              )}

              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  {plan.name}
                </h2>

                <p className="mt-2 min-h-12 text-sm leading-relaxed text-slate-500">
                  {plan.description}
                </p>
              </div>

              <div className="mt-7">
                <div className="flex items-start gap-1">
                  {plan.pricePrefix && (
                    <span className="mt-1 text-lg font-semibold text-slate-700">
                      {plan.pricePrefix}
                    </span>
                  )}

                  <span
                    className={`font-semibold tracking-tight text-slate-950 ${
                      plan.price === 'Custom' ? 'text-3xl' : 'text-5xl'
                    }`}
                  >
                    {plan.price}
                  </span>

                  {plan.priceSuffix && (
                    <span className="mt-2 text-xs font-medium text-slate-400">
                      {plan.priceSuffix}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  {plan.billingDescription}
                </p>
              </div>

              <NavLink
                to={plan.actionPath}
                className={`mt-7 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition ${
                  plan.highlighted
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {plan.actionLabel}
              </NavLink>

              <div className="my-7 h-px bg-slate-100" />

              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  What&apos;s included
                </p>

                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-relaxed text-slate-600"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <Check size={12} strokeWidth={2.4} />
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
              Compare Plans
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Find the plan that fits your workspace
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Compare project limits, analysis capabilities, collaboration, and
              support across all available plans.
            </p>
          </div>

          <div className="mt-14 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[840px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="w-[34%] border-b border-slate-200 px-6 py-5 text-sm font-semibold text-slate-900">
                    Feature
                  </th>

                  <th className="border-b border-slate-200 px-6 py-5">
                    <p className="text-sm font-semibold text-slate-900">
                      Starter
                    </p>

                    <p className="mt-1 text-xs font-normal text-slate-500">
                      Free forever
                    </p>
                  </th>

                  <th className="border-b border-red-200 bg-red-50/60 px-6 py-5">
                    <p className="text-sm font-semibold text-red-700">Pro</p>

                    <p className="mt-1 text-xs font-normal text-red-600/70">
                      $15 per member/month
                    </p>
                  </th>

                  <th className="border-b border-slate-200 px-6 py-5">
                    <p className="text-sm font-semibold text-slate-900">
                      Enterprise
                    </p>

                    <p className="mt-1 text-xs font-normal text-slate-500">
                      Custom pricing
                    </p>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row) => (
                  <tr
                    key={row.feature}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      {row.feature}
                    </td>

                    <td className="px-6 py-4">
                      <ComparisonValue value={row.starter} />
                    </td>

                    <td className="bg-red-50/30 px-6 py-4">
                      <ComparisonValue value={row.pro} />
                    </td>

                    <td className="px-6 py-4">
                      <ComparisonValue value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-slate-950 px-7 py-12 text-white md:px-12 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-red-400">
              Start Today
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Start understanding social conversations with context
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Create your first workspace, collect relevant conversations, and
              turn social data into actionable insight.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <NavLink
              to="/register"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Get Started Free
            </NavLink>

            <NavLink
              to="/about"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Learn More
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
