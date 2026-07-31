import {
  ArrowRight,
  AtSign,
  BrainCircuit,
  Calendar,
  Database,
  Download,
  Globe,
  Lightbulb,
  Search,
  Share2,
  Smile,
  Users,
} from 'lucide-react';

const ProjectPage = () => {
  const project = {
    workspaceName: 'Public Policy Tracker',
    name: 'MBG Jatinangor Evaluation',
    description:
      'Monitoring public reaction, complaints, and overall sentiment regarding the implementation of the Makan Bergizi Gratis (MBG) program in the Jatinangor area.',
    query: 'mbg jatinangor viral',
    language: 'Indonesian (ID)',
    dateRange: 'Feb 01, 2026 - Feb 15, 2026',

    snapshots: {
      totalVolume: '24,850',
      uniqueAccounts: '8,120',
      dominantMood: 'Negative',
      dominantPercentage: '58%',
      topTopic: 'Food Quality & Menu',
      topInfluencer: '@unpadfess',
    },

    topics: [
      {
        name: 'Food Quality & Portion Complaints',
        description:
          'Keluhan dominan mengenai porsi lauk yang sedikit dan sayur yang sudah tidak segar/dingin saat dibagikan ke siswa.',
        share: 34,
        count: '8.4K',
        sentiment: 'Negative',
      },
      {
        name: 'Logistics & Distribution Delays',
        description:
          'Banyak sekolah melaporkan makanan baru tiba setelah jam istirahat siang selesai, sehingga mengganggu jadwal KBM.',
        share: 22,
        count: '5.4K',
        sentiment: 'Negative',
      },
      {
        name: 'Local Vendor Empowerment',
        description:
          'Sentimen positif terkait pelibatan ibu-ibu PKK dan vendor katering lokal Jatinangor dalam penyediaan makanan.',
        share: 18,
        count: '4.4K',
        sentiment: 'Positive',
      },
      {
        name: 'Packaging Waste Concerns',
        description:
          'Kekhawatiran mahasiswa dan aktivis lingkungan kampus terkait penumpukan sampah kotak makan plastik sekali pakai.',
        share: 12,
        count: '2.9K',
        sentiment: 'Neutral',
      },
    ],

    influencers: [
      {
        name: 'UNPAD Fess',
        handle: '@unpadfess',
        role: 'Community Hub',
        impact: '1.2M Views',
      },
      {
        name: 'Info Jatinangor',
        handle: '@info_jatinangor',
        role: 'News Amplifier',
        impact: '850K Views',
      },
      {
        name: 'BEM Kema Unpad',
        handle: '@bem_unpad',
        role: 'Opinion Leader',
        impact: '420K Views',
      },
      {
        name: 'Lokal Reviewer',
        handle: '@jajanjatinangor',
        role: 'Viral Source',
        impact: '310K Views',
      },
    ],

    chartData: [
      { date: 'Feb 01', volume: 120 },
      { date: 'Feb 02', volume: 150 },
      { date: 'Feb 03', volume: 210 },
      { date: 'Feb 04', volume: 180 },
      { date: 'Feb 05', volume: 450 },
      { date: 'Feb 06', volume: 1200 },
      { date: 'Feb 07', volume: 5400 },
      { date: 'Feb 08', volume: 8200 },
      { date: 'Feb 09', volume: 4100 },
      { date: 'Feb 10', volume: 2200 },
      { date: 'Feb 11', volume: 1100 },
      { date: 'Feb 12', volume: 800 },
      { date: 'Feb 13', volume: 550 },
      { date: 'Feb 14', volume: 420 },
      { date: 'Feb 15', volume: 350 },
    ],
  };

  const maxVolume = Math.max(...project.chartData.map((item) => item.volume));

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
      <div className="space-y-6 pb-10">
        {/* Project header */}
        <header className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
              {project.name}
            </h1>

            {project.description && (
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {project.description}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                <Search size={14} className="text-slate-400" />

                <span className="text-slate-500">Query</span>

                <span className="font-medium text-slate-800">
                  “{project.query}”
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                <Calendar size={14} className="text-slate-400" />

                <span className="text-slate-500">Period</span>

                <span className="font-medium text-slate-800">
                  {project.dateRange}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                <Globe size={14} className="text-slate-400" />

                <span className="text-slate-500">Language</span>

                <span className="font-medium text-slate-800">
                  {project.language}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Share2 size={16} />
              Share
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <Download size={16} />
              Export Report
            </button>
          </div>
        </header>

        {/* KPI cards */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <Database size={14} />

              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Total Tweets
              </span>
            </div>

            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              {project.snapshots.totalVolume}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <Users size={14} />

              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Unique Accounts
              </span>
            </div>

            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              {project.snapshots.uniqueAccounts}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <Smile size={14} />

              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Dominant Mood
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-xl font-semibold text-red-600">
                {project.snapshots.dominantMood}
              </span>

              <span className="text-xs font-medium text-red-400">
                {project.snapshots.dominantPercentage}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <BrainCircuit size={14} />

              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Top Topic
              </span>
            </div>

            <p
              title={project.snapshots.topTopic}
              className="mt-3 line-clamp-2 text-sm font-semibold leading-relaxed text-slate-800"
            >
              {project.snapshots.topTopic}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <AtSign size={14} />

              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Top Influencer
              </span>
            </div>

            <p
              title={project.snapshots.topInfluencer}
              className="mt-3 truncate text-sm font-semibold text-slate-800"
            >
              {project.snapshots.topInfluencer}
            </p>
          </div>
        </section>

        {/* Conversation volume */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">
                Conversation Volume Trend
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Visualizing the lifecycle of the conversation to identify viral
                peaks and narrative decay.
              </p>
            </div>

            <button
              type="button"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-red-600"
            >
              View Analytics
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>

          <div className="mb-8 flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50/60 p-4">
            <Lightbulb size={18} className="mt-0.5 shrink-0 text-blue-500" />

            <p className="text-sm leading-relaxed text-slate-700">
              <strong className="font-semibold text-slate-900">
                Key Event:
              </strong>{' '}
              A massive spike was detected between{' '}
              <span className="font-semibold text-slate-900">
                Feb 07–Feb 08
              </span>
              , contributing to more than 50% of the total volume.
            </p>
          </div>

          <div className="relative flex h-[240px] w-full items-end justify-between gap-1 border-b border-slate-100 pb-6 sm:gap-2">
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-6 opacity-30">
              <div className="h-px w-full bg-slate-200" />
              <div className="h-px w-full bg-slate-200" />
              <div className="h-px w-full bg-slate-200" />
              <div className="h-px w-full bg-slate-200" />
            </div>

            {project.chartData.map((data) => {
              const heightPercentage = (data.volume / maxVolume) * 100;

              const isPeak = data.volume === maxVolume;

              return (
                <div
                  key={data.date}
                  className="group relative z-10 flex h-full flex-1 cursor-pointer justify-center"
                >
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    <span className="font-semibold">{data.date}:</span>{' '}
                    {data.volume.toLocaleString('en-US')} Tweets
                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-slate-900" />
                  </div>

                  <div
                    className={`mt-auto w-full max-w-12 rounded-t-sm transition-colors ${
                      isPeak
                        ? 'bg-red-500 group-hover:bg-red-600'
                        : 'bg-slate-200 group-hover:bg-slate-300'
                    }`}
                    style={{
                      height: `${heightPercentage}%`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-between px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            <span>{project.chartData[0]?.date}</span>

            <span>
              {
                project.chartData[Math.floor(project.chartData.length / 4)]
                  ?.date
              }
            </span>

            <span className="font-semibold text-red-600">
              {project.chartData[7]?.date} Peak
            </span>

            <span>
              {
                project.chartData[
                  Math.floor((project.chartData.length / 4) * 3)
                ]?.date
              }
            </span>

            <span>{project.chartData[project.chartData.length - 1]?.date}</span>
          </div>
        </section>

        {/* Topics and actors */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Topics Snapshot
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Categorization of what people are discussing.
                </p>
              </div>

              <button
                type="button"
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-red-600"
              >
                Explore
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </div>

            <div className="mb-8 space-y-6">
              {project.topics.map((topic) => (
                <article key={topic.name}>
                  <div className="mb-2.5 flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold leading-tight text-slate-800">
                        {topic.name}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
                        {topic.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="block text-sm font-semibold text-slate-700">
                        {topic.share}%
                      </span>

                      <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        {topic.count} Posts
                      </span>
                    </div>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${
                        topic.sentiment === 'Negative'
                          ? 'bg-red-500'
                          : topic.sentiment === 'Positive'
                            ? 'bg-emerald-500'
                            : 'bg-slate-400'
                      }`}
                      style={{
                        width: `${topic.share}%`,
                      }}
                    />
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="mt-auto w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Explore All Topics
            </button>
          </section>

          <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Key Actors
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Accounts driving the highest engagement and reach.
                </p>
              </div>

              <button
                type="button"
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-red-600"
              >
                View All
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </div>

            <div className="flex-1">
              {project.influencers.map((influencer) => (
                <article
                  key={influencer.handle}
                  className="-mx-2 flex items-center justify-between rounded-lg border-b border-slate-100 px-2 py-3 transition last:border-0 hover:bg-slate-50/60"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-600">
                      {influencer.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-slate-900">
                        {influencer.name}
                      </h3>

                      <p className="truncate text-xs text-slate-500">
                        {influencer.handle}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-slate-800">
                      {influencer.impact}
                    </p>

                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      {influencer.role}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
